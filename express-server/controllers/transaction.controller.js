const Transaction = require("../models/transaction.model.js")

exports.create = (req, res) => {
    const transaction = new Transaction({
        date: req.body.date,
        customer_pno: req.body.customer_pno,
        balance: req.body.balance
    })

    Transaction.create(transaction, (err, data) => {
        if (err) 
            res.status(500).send({
                message: err.message  || "Some error occurred while recording the transaction"
            })
        else res.send(data)
    })
}