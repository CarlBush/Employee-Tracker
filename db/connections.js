const mysql = require("mysql2");

//SQL DATABASE 
const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "asdf123",
        database: "company"
    },
    console.log("Connected to the database.")
);

module.exports = db;