const User = require("../models/user.model.js")

exports.create = (req, res) => {
    const user = new User({
        email: req.body.email,
        password: req.body.password,
    })

    User.create(user, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message  || "Some error occurred while registering the user"
            })
        else res.send(data)
    })
}

exports.exists = (req, res) => {
    User.exists(req.body.email, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No such user with given credentials`
                })
            } else {
                res.status(500).send({
                    message: `Error`
                })
            }
        } else res.send(data)
    })
}

exports.find = (req, res) => {
    User.find(req.body.email, req.body.password, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No such user with given credentials`
                })
            } else {
                res.status(500).send({
                    message: `Error`
                })
            }
        } else res.send(data)
    })
}