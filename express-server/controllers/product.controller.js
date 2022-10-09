const Product = require("../models/product.model.js")

exports.create = (req, res) => {

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