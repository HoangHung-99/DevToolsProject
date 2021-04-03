const controller = require("../controllers/book.controller");

module.exports = function (app) {
  //app.get("/api/books/all", controller.allAccess);

  //đường dẫn vào phương thức đăng ký
  app.post("/api/book/create", controller.createBooks);

  app.get("/api/book/find", controller.findBooks);
  app.get("/api/book/get", controller.getBooks);
};
