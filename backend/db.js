const mysql = require("mysql2");
require("dotenv").config();
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: process.env.DB_PASS,
  database: "expense_tracker",
});

db.connect((err) => {
  if (err) {
    console.log(err);
    
  } else {
    console.log("MySQL Connected");
  }
});

module.exports = db;