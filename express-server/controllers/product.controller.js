const Product = require("../models/product.model.js")

exports.create = (req, res) => {
    const product = new Product({
        name: req.body.name,
        rate: req.body.rate,
        tax: req.body.tax,
        stock: req.body.stock,
    })

    Product.create(product, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message  || "Some error occurred while creating the product"
            })
        else res.send(data)
    })
}

exports.findMany = (req, res) => {
    Product.findAllStartingWith(req.params.name, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No such product(s) with id ${req.params.id}`
                })
            } else {
                res.status(500).send({
                    message: `Error while searching product(s) with id ${req.params.id}`
                })
            }
        } else res.send(data)
    })
}

exports.findOne = (req, res) => {
    Product.findById(req.params.id, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `No such product with id ${req.params.id}`
                })
            } else {
                res.status(500).send({
                    message: `Error while searching product with id ${req.params.id}`
                })
            }
        } else res.send(data)
    })
}