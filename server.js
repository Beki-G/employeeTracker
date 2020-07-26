const dotenv = require("dotenv");
const inquirer = require("inquirer");
const Database = require("./lib/Database");
const querybuilder = require("./lib/querybuilder");
const cTable = require("console.table");
const inquirerQuestions = require("./lib/inquirerQuestions");

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


async function init(){
  const {actionByUser} = await inquirer.prompt(inquirerQuestions.initialQuestion())

  switch (actionByUser){
    case "View":
      const {viewTable} = await inquirer.prompt(inquirerQuestions.viewQuestion());
      try{
        const res = await sqlDatabase.query(querybuilder.readTable(viewTable.toLowerCase()))
        renderTable(res)
      } catch (err){
        console.log(err)
        return;
      }
      init();
      break;
    case "Add":
      const {createType} = await inquirer.prompt(inquirerQuestions.createQuestion());
      const response = await inquirer.prompt(inquirerQuestions.createTypeQ(createType))
      console.log(response)
      try {
        //future query to SQL DB
      } catch (error) {
        console.log(error)
        sqlDatabase.close();
        return;
      }
      
      init();
      break;
    default: 
      sqlDatabase.close()
  }
}

function renderTable(sqlResponse){
  const newArr= []
  sqlResponse.forEach(row=>{
    newArr.push(Object.assign({}, row))
  })
  console.table(newArr)
}

//test functionality by using query
// async function tryAQuery(){
//   const finalArr=[];

//   sqlDatabase.query(querybuilder.updateEmployeeRole("4", "1"))

//   const res =await sqlDatabase.query(querybuilder.readTable("employee"))
  
//   //console.log(querybuilder.createDepartment("customerservice"))
//   // map an array from db response
//   res.map(row=>{
//       finalArr.push(Object.assign({}, row));
//   })
//   //if it works a an array of objects will be console logged
//   console.log(finalArr)
// }

init();