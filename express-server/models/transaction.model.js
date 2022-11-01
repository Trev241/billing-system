const sql = require("./db.js")

// constructor
const Transaction = function(transaction) {
    this.date = transaction.date
    this.customer_pno = transaction.customer_pno
    this.balance = transaction.balance
}

Transaction.create = (newTransaction, products, result) => {
    sql.query("INSERT INTO Transaction SET ?", newTransaction, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        console.log(products)
        products.forEach(p => {
            sql.query(
                `INSERT INTO TransactionProduct (t_id, p_id, p_tax, p_discount, p_rate, p_qty) VALUES (${res.insertId}, ${p.id}, ${p.tax}, ${p.discount}, ${p.rate}, ${p.qty})`, 
                (err, res) => {
                    if (err) console.log("error: ", err)
                    console.log("Recorded product in transaction: ", {id: res.insertId})
                }
            )
        })

        console.log("Recorded transaction: ", { id: res.insertId, ...newTransaction })
        result(null, { id: res.insertId, ...newTransaction })
    })
    
}

Transaction.findAll = (result) => {
    sql.query(`SELECT * FROM Transaction`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found transaction(s): ", res)
            result(null, res)
            return
        }

        result({ kind: "not_found" }, null)
    })
}

Transaction.findProductsInId = (id, result) => {
    sql.query(`SELECT * FROM TransactionProduct JOIN Product ON TransactionProduct.p_id=Product.product_id WHERE TransactionProduct.t_id=${id}`, (err, res) => {
        if (err) {
            console.log("error", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found product(s) purchased: ", res)
            result(null, res)
            return
        }

        result({ kind: "not_found" }, null)
    })
}

module.exports = Transaction

