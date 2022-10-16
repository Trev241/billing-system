const Customer = require("../models/customer.model.js")

exports.create = (req, res) => {
    const customer = new Customer({
        phone_no: req.body.phone_no,
        name: req.body.name,
        email: req.body.email
    })

    Customer.create(customer, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message  || "Some error occurred while adding the customer"
            })
        else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Customer.findByPhoneNo(req.body.phone_no, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No customer with phone number ${req.body.phone_no}`
                })
            } else {
                res.status(500).send({
                    message: `Error while searching for customer with phone number ${req.body.phone_no}`
                })
            }
        } else res.send(data)
    })
}