var mysql = require('mysql');

env = {
    host: "remotemysql.com",
    user: "reFGnomQii",
    password: "A4cDfRkCCI",
}

var con = mysql.createConnection({
    host: env.host,
    user: env.user,
    password: env.password,
});

con.connect((err) => {
    if (err) throw err;
    console.log("Connected!");
});

export function select(columns, table, condition) {
    con.query(`SELECT ${columns} FROM ${table} WHERE ${condition}`, (err, result, fields) => {
        if (err) throw err;
        return result
    })
}
