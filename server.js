const mysql = require("mysql");
const dotenv = require("dotenv");
const inquirer = require("inquirer");
const Database = require("./lib/Database");
const querybuilder = require("./lib/querybuilder");

//set password to mySQL DB
dotenv.config();
const sqlPass = process.env.secret

//Connection information for the sql database
const connection ={
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: sqlPass,
  database: "employee_trackerDB"
};

//Initiate database connection
sqlDatabase = new Database(connection);


//test functionality by using query
async function tryAQuery(){
  const finalArr=[];

  const res =await sqlDatabase.query(querybuilder.readTable("employee"))
  
  //console.log(querybuilder.createDepartment("customerservice"))
  // map an array from db response
  res.map(row=>{
      finalArr.push(Object.assign({}, row));
  })
  //if it works a an array of objects will be console logged
  console.log(finalArr)
}

tryAQuery();

//terminate database connection
sqlDatabase.close();