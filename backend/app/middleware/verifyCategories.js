const db = require("../models");
const CATES = db.CATES;

//kiểm tra role có tồn tại hay không
checkCatesExisted = (req, res, next) => {
    if (req.body.categories) {
      for (let i = 0; i < req.body.categories.length; i++) {
        if (!CATES.includes(req.body.categories[i])) {
          res.status(400).send({
            message: "Vai trò người dùng không tồn tại = " + req.body.categories[i]
          });
          return;
        }
      }
    }
    
    next();
  };

  const verifyCategories = {
    checkRolesExisted: checkCatesExisted
  };
  
  module.exports = verifyCategories;  