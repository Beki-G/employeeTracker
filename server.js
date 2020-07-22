const mysql = require("mysql");
const dotenv = require("dotenv");
const inquirer = require("inquirer");

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

const userAction = {
  name: "wantedActionByUser",
  message: "What would you like to do you in your employee database?",
  type: "list",
  choices: ["View", "Add", "Modify", "Exit"]
}


const actionTreeQuestions = {
  View:{
    name: "viewInDB",
    message: "What would you like to view?",
    type:"list",
    choices:["Employees", "Roles", "Departments"]
  },
  Add:{
    name:"addInDB",
    message: "What would you like to add?",
    type: "list",
    choices:["Employees", "Roles", "Departments"]
  },
  Modify:{
    name:"updateInDB",
    message:"What would you like to update?",
    type:"list",
    choices:["Employess", "Roles", "Departments"]
  }
}

async function accessDB(){
  const { wantedActionByUser } = await inquirer.prompt(userAction);

  switch (wantedActionByUser){
    case "View":
      //future function to handle view questions in db
      console.log("made it to view")
      //viewInDB();
      accessDB();
      break;
    case "Add":
      //future function to handle add questions in db
      console.log("made it to Add")
      //addInDB();
      accessDB();
      break;
    case "Modify":
      console.log("made it to modify")
      //future function to handle update questions in db
      //updateInDB();
      accessDB();
      break;
    default:
      //anyting else ends the connection
      endConnection();
      break;
  }

}

connection.connect((err)=>{
  if(err) throw(err);
  console.log("Connected as id " + connection.threadId);
  accessDB()
  
})

function endConnection(){
  console.log("Bye~!");
  connection.end();
}