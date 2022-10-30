module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    router.post('/', transactions.create)
    router.get('/all', transactions.getAll)

    app.use('/api/transactions', router);
}