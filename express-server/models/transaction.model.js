const sql = require("./db.js")

// constructor
const Transaction = function(transaction) {
    this.date = transaction.date
    this.balance = transaction.balance
}

Transaction.create = (newTransaction, result) => {
    sql.query("INSERT INTO Transaction SET ?", newTransaction, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        console.log("Recorded transaction: ", { id: res.insertId, ...newTransaction })
        result(null, { id: res.insertId, ...newTransaction })
    })
}

module.exports = Transaction

