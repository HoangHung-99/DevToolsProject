const config = require("../config/db.config.js");

//Cài đặt kết nối giữa mysql và nodejs
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
  config.DB,
  config.USER,
  config.PASSWORD,
  {
    host: config.HOST,
    dialect: config.dialect,
    operatorsAliases: false,

    pool: {
      max: config.pool.max,
      min: config.pool.min,
      acquire: config.pool.acquire,
      idle: config.pool.idle
    }
  }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/roles.model.js")(sequelize, Sequelize);
db.book = require("../models/books.model.js")(sequelize, Sequelize);
db.cate = require("../models/cate.model.js")(sequelize, Sequelize);


//Vì mối quan hệ giữa người dùng và role là nhiều-nhiều
//1 người dùng có thể có nhiều role
//1 role có thể nhận nhiều người dùng
//Nên cần tạo 1 liên kết quan hệ nhiều-nhiều giữa 2 thực thể này
db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.cate.belongsToMany(db.book, {
  through: "book_detail",
  foreignKey: "cateId",
  otherKey: "bookId"
});
db.book.belongsToMany(db.cate, {
  through: "book_detail",
  foreignKey: "bookId",
  otherKey: "cateId"
});


db.ROLES = ["user", "admin", "moderator"];
db.CATES = ["khac", "sach thieu nhi", 'tieu thuyet', 'van hoc nuoc ngoai', 'truyen tranh', 'sach giao khoa']

module.exports = db;
