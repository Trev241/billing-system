module.exports = app => {
    const transactions = require("../controllers/transaction.controller.js");
  
    var router = require("express").Router();
  
    router.post('/create', transactions.create)
    router.post('/details', transactions.getDetails)
    router.get('/all', transactions.getAll)

    app.use('/api/transactions', router);
}