const sql = require("./db.js")

// constructor
const Customer = function(customer) {
    this.phone_no = customer.phone_no
    this.name = customer.name
    this.email = customer.email
}

Customer.create = (newCustomer, result) => {
    sql.query("INSERT INTO Customer SET ?", newCustomer, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        console.log("Added customer: ", { id: res.insertId, ...newCustomer })
        result(null, { id: res.insertId, ...newCustomer })
    })
}

Customer.findByPhoneNo = (phone_no, result) => {
    sql.query(`SELECT * FROM Customer WHERE phone_no = ${phone_no}`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found customer: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null)
    })
}

module.exports = Customer

