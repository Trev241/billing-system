module.exports = app => {
    const products = require("../controllers/product.controller.js");
  
    var router = require("express").Router();
  
    // Retrieve a single Product with id
    router.get("/id/:id", products.findOne);
    router.get("/name/:name", products.findMany);
  
    app.use('/api/products', router);
}