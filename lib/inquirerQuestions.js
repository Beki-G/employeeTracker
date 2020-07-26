module.exports = {
    initialQuestion:()=>{
      return [{
        name:"actionByUser",
        message:"What would you like to do in you Employee Tracker?",
        type:"list",
        choices:["View", "Add", "Update", "Exit"]
      }]  
    },

    viewQuestion:()=>{
        return [{
            name:"viewTable",
            message:"Which would you like to view?",
            type:"list",
            choices:[`Employee`, "Role", "Department"]
        }]
    },

    createQuestion:()=>{
        return [{
            name:"createType",
            message:"What would you like to add?",
            type:"list",
            choices:["Employee", "Role", "Department"]
        }]
    },

    createTypeQ:(type)=>{
        let questions;
        switch(type){
            case "Employee":
                questions = [{
                    name:"first_name",
                    message:"What is the employee's first name?",
                    type:"input"
                  },
                  {
                    name:"last_name", 
                    message: "What is the employee's last name?",
                    type:"input",
                  },
                  {
                    name:"role_id",
                    message: "What is the employee's role ID?",
                    type:"input"
                },
                {
                    name:"manager_id",
                    message: "What is the employee's manager's employee ID?",
                    type:"input"
                }]
                break;
            case "Role":
                questions = [{
                    name:"role_name",
                    message:"What is the title of the role?",
                    type:"input"
                  },
                  {
                    name:"role_salary",
                    message:"What is the role's salary?",
                    type:"input"
                  },
                  {
                    name:"department_id",
                    message:"What is the role's department ID?",
                    type:"input"
                  }]
                break;
            case "Department":
                  questions = [{
                    name:"dept_name",
                    message:"What is the department's name?",
                    type:"input"
                  }]
                break;
        }
        return questions;
    }
}