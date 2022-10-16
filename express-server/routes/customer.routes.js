module.exports = app => {
    const customers = require("../controllers/customer.controller.js");
  
    var router = require("express").Router();
  
    router.post('/create', customers.create)
    router.post('/find', customers.findOne)
  
    app.use('/api/customers', router);
}