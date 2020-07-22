const mysql = require("mysql");
const dotenv = require("dotenv");

//set password to mySQL DB
dotenv.config();
const sqlPass = process.env.secret

// create the connection information for the sql database
const connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: sqlPass,
  database: "employee_trackerDB"
});

connection.connect((err)=>{
  if(err) throw(err);
  console.log("Connected as id " + connection.threadId)
  connection.end();
})