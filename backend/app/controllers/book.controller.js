const { book } = require("../models");
const db = require("../models");
const Book = db.book;
const Category = db.cate;

const Op = db.Sequelize.Op;

exports.getBooks = (req, res) => {
  Book.findAll()
    .then((book) => {
      res.status(200).send({
        book
      });
    })
    .catch((err) => console.log(err));
};

exports.createBooks = (req, res) => {
  // Lưu người dùng mới vào database
  Book.create({
    id_book: req.body.id_book,
    title: req.body.title,
    authors: req.body.authors,
    quantity: req.body.quantity,
    price: req.body.price,
    description: req.body.description,
  })
    .then((book) => {
      if (req.body.categories) {
        Category.findAll({
          where: {
            catename: {
              [Op.or]: req.body.categories, // Tìm theo tên role
            },
          },
        }).then((categories) => {
          book.setCategories(categories).then(() => {
            res.send({ message: "Sách đã được thêm" }); // nếu tên role có sự khác biệt sẽ thực hiện khối lệnh này và lưu với tên role đó
          });
        });
      } else {
        // user role = 1
        book.setCategories([1]).then(() => {
          res.send({ message: "Sách đã được thêm" }); // Nếu không có tên role thì mặc định role sẽ = 1 = user
        });
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.findBooks = (req, res) => {
  var { term } = req.query;

  Book.findAll({
    where: {
      title: {
        [Op.like]: "%" + term + "%",
      },
    },
  })
    .then((book) => {
      res.status(200).send({
        book
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};
