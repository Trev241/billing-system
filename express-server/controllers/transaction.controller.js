const Transaction = require("../models/transaction.model.js")

exports.create = (req, res) => {
    const transaction = new Transaction({
        date: req.body.date,
        customer_pno: req.body.customer_pno,
        balance: req.body.balance
    })
    const products = req.body.products

    Transaction.create(transaction, products, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message  || "Some error occurred while recording the transaction"
            })
        else res.send(data)
    })
}

exports.getAll = (req, res) => {
    Transaction.findAll((err, data) => {
        // console.log(res)
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: "No transactions to retrieve"
                })
            } else {
                res.status(500).send({
                    message: `Error while retrieving transaction history`
                })
            }
        } else res.send(data)
    })
}