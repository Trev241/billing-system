module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    router.post('/', transactions.create)
  
    app.use('/api/transactions', router);
  };