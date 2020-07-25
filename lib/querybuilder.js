module.exports= {
    readTable:(table)=>{
        return `SELECT * FROM ${table}`
    },

    createEmployee:(first_name,last_name, role_id, manager_id)=>{
        return `
        INSERT INTO employee (first_name, last_name, role_id, manager_id)
        VALUES(\"${first_name}\", \"${last_name}\", \"${role_id}\", \"${manager_id}\");`
    },

    createRole:(title, salary, department_id)=>{
        return `
        INSERT INTO role (title, salary, department_id)
        VALUES(\"${title}\", \"${salary}\", \"${department_id}\");`
    },

    createDepartment:(name)=>{
        return `
        INSERT INTO department(name)
        VALUES(\"${name}\");`
    },

    updateEmployeeRole:(employeeID, role_id)=>{
        return `
        UPDATE employee
        SET role_id = \"${role_id}\"
        WHERE emp_id =\"${employeeID}\"`
    }
}