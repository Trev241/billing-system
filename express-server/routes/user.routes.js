module.exports = app => {
    const users = require("../controllers/user.controller.js");
  
    var router = require("express").Router();

    // router.get("/:name:password", users.find);
    router.post("/register", users.create)
    router.post("/login", users.find)
    router.post("/exists", users.exists)
  
    app.use("/", router)
}