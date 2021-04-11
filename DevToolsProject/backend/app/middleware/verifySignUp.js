const db = require("../models");
const ROLES = db.ROLES;
const User = db.user;

//Xác thực thông tin đăng ký
checkDuplicateUsernameOrEmail = (req, res, next) => {
  // Tên người dùng
  User.findOne({
    where: {
      username: req.body.username
    }
  }).then(user => {
    if (user) {
      res.status(400).send({
        message: "Tên người dùng đã tồn tại"
      });
      return;
    }

    // Email
    User.findOne({
      where: {
        email: req.body.email
      }
    }).then(user => {
      if (user) {
        res.status(400).send({
          message: "Email đã tồn tại"
        });
        return;
      }

      next();
    });
  });
};

//kiểm tra role có tồn tại hay không
checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: "Vai trò người dùng không tồn tại = " + req.body.roles[i]
        });
        return;
      }
    }
  }
  
  next();
};

const verifySignUp = {
  checkDuplicateUsernameOrEmail: checkDuplicateUsernameOrEmail,
  checkRolesExisted: checkRolesExisted
};

module.exports = verifySignUp;
