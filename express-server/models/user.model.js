const sql = require("./db.js")

// constructor
const User = function(user) {
    this.email = user.email
    this.password = user.password
};

User.create = (newUser, result) => {
    sql.query("INSERT INTO User SET ?", newUser, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        console.log("Registered user: ", { id: res.insertId, ...newUser })
        result(null, { id: res.insertId, ...newUser })
    })
}

User.exists = (email) => {
    sql.query(`SELECT * FROM User WHERE email = "${email}"`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }

        if (res.length) {
            console.log("Found user: ", res[0]);
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null)
    })
}

User.find = (email, password, result) => {
    sql.query(`SELECT * FROM User WHERE email = "${email}" AND password = "${password}"`, (err, res) => {
        if (err) {
            console.log("error: ", err)
            result(err, null)
            return
        }
        
        if (res.length) {
            console.log("Found user: ", res[0]);
            console.log("Query: ", `SELECT * FROM User WHERE email = "${email}" AND password = "${password}"`)
            result(null, res[0]);
            return;
        }

        result({ kind: "not_found" }, null)
    })
};

module.exports = User;