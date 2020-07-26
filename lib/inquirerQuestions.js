module.exports = {
    initialQuestion:()=>{
      return [{
        name:"actionByUser",
        message:"What would you like to do in you Employee Tracker?",
        type:"list",
        choices:["View", "Add", "Update"]
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
}