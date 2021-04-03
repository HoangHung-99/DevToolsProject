const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");

//Đăng ký
exports.signup = (req, res) => {
  // Lưu người dùng mới vào database
  User.create({
    //id_user: req.body.id_user,
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  })
    .then((user) => {
      if (req.body.roles) {
        Role.findAll({
          where: {
            name_role: {
              [Op.or]: req.body.roles, // Tìm theo tên role
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({ message: "Đăng ký thành công" }); // nếu tên role có sự khác biệt sẽ thực hiện khối lệnh này và lưu với tên role đó
          });
        });
      } else {
        // user role = 1
        user.setRoles([1]).then(() => {
          res.send({ message: "Đăng ký thành công" }); // Nếu không có tên role thì mặc định role sẽ = 1 = user
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

//Đăng nhập
exports.signin = (req, res) => {
  User.findOne({
    where: {
      username: req.body.username,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "Người dùng không tồn tại" });
      }
      //Kiểm tra mật khẩu
      var passwordIsValid = bcrypt.compareSync(
        req.body.password,
        user.password
      );
      //Sai mật khẩu
      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Mật khẩu không hợp lệ",
        });
      }
      //Sau khi đăng nhập hệ thống sẽ cấp cho người dùng 1 token có thời hạn 24 tiếng đăng nhập, sau 24h sẽ tự động đăng xuất
      var token = jwt.sign({ id: user.id }, config.secret, {
        expiresIn: 86400, // 24 hours
      });
      
      //Hiện thị lên role của người dùng
      var authorities = [];
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push("ROLE_" + roles[i].name_role);
        }
        res.status(200).send({
          id: user.id,
          username: user.username,
          email: user.email,
          roles: authorities,
          accessToken: token,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
