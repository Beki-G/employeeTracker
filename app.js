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
      try {
        await sqlDatabase.query(querybuilder.createSQLbyType(createType), querybuilder.createArgsByType(createType, response))
        const res = await sqlDatabase.query(querybuilder.readTable(createType.toLowerCase()));
        renderTable(res);
      } catch (error) {
        console.log(error)
        return;
      }
      
      init();
      break;
    case "Update":
      const staff = await sqlDatabase.query(querybuilder.getStaff())

      const employee = getTableFromData(staff)

      let {updateEmployee, updateType} = await inquirer.prompt(inquirerQuestions.updateQuestion(employee))

      if(updateType === "Employee Role"){
        await updateEmployeeRole(updateEmployee)
      }else{
        await updateEmployeeManager(updateEmployee)
      }
      sqlDatabase2.close()

      init();
      break;
    default: 
      sqlDatabase.close()
  }
}

async function updateEmployeeRole(employee){
  //create new connection 
  sqlDatabase2 = new Database(connection);

  //get all current roles___________________
  let sql = querybuilder.getRoleTable();

  const option = await sqlDatabase2.query(sql)

  const newArr = []
  //parse data
  option.forEach(row=>{
    newArr.push(row.Title)
  })
  //ask user to what they would like to update
  const {updateColumn} = await inquirer.prompt(inquirerQuestions.updateByType(newArr))
  //split name into two arguments--(avoid if two people have the first name)
  nameArgs = querybuilder.updateEmployeeArgs(employee);

  //get array of sql queries
  const roleArr= querybuilder.updateEmployee("Employee Role")

  //query the database for role id
  const roleID = await sqlDatabase2.query(roleArr[0],[updateColumn]);

  //parse data
  const args = [roleID[0].role_id]
  //into a single arr role id & name arguments
  args.push(...nameArgs)

  //query db to update employee record
  await sqlDatabase2.query(roleArr[1], args)

  //get updated employee table & render
  const finalQuery = await sqlDatabase2.query(querybuilder.readTable("employee"))

  renderTable(finalQuery)

}

async function updateEmployeeManager(employee){
  //create new connection 
  sqlDatabase2 = new Database(connection);

  //get all current managers
  const option = await sqlDatabase2.query(querybuilder.getCurrentManagers())

  const newArr = []
  //parse data
  option.forEach(row=>{
    newArr.push(row.Manager)
  })
  //ask user to what they would like to update
  const {updateColumn} = await inquirer.prompt(inquirerQuestions.updateByType(newArr))
  //split name into two arguments--(avoid if two people have the first name)
  console.log("Employee: ", employee)
  nameArgs = querybuilder.updateEmployeeArgs(employee);
  managerNameArgs = querybuilder.updateEmployeeArgs(updateColumn)

  //get array of current manager 
  const managerArr= querybuilder.updateEmployee("Employee Manager")

  //query the database for manager id
  const managerID = await sqlDatabase2.query(managerArr[0],managerNameArgs);

  //parse data
  const args = [managerID[0].emp_id]
  //into a single arr manager id & name arguments
  args.push(...nameArgs)

  //query db to update employee record
  await sqlDatabase2.query(managerArr[1], args)

  //get updated employee table & render
  const finalQuery = await sqlDatabase2.query(querybuilder.readTable("employee"))

  renderTable(finalQuery)
}

function getTableFromData(arr){
  const newArr= []
  arr.forEach(row=>{
    newArr.push(row.Staff)
  })
  return newArr
}

function renderTable(sqlResponse){
  const newArr= []
  sqlResponse.forEach(row=>{
    newArr.push(Object.assign({}, row))
  })
  console.table(newArr)
}

init();