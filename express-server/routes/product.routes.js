module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single Product with id
    router.get("/:id", products.findOne);
  
    app.use('/api/products', router);
}