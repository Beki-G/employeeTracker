module.exports= {
    readTable:(table)=>{
        let sql;

        switch(table){
            case "employee":
                sql = `SELECT s.emp_id Employee_ID, CONCAT(s.first_name, ' ', s.last_name) Staff, r.title Title, d.name Department, r.salary Salary, CONCAT(m.first_name, ' ', m.last_name) Manager    
                FROM employee s
                LEFT JOIN employee m ON m.emp_id = s.manager_id
                LEFT JOIN role r ON r.role_id = s.role_id
                LEFT JOIN department d ON d.dept_id = r.department_id;`
                break;
            case "role":
                sql = `
                SELECT r.title Title, r.salary Salary, d.name Department
                FROM role r
                LEFT JOIN department d ON d.dept_id = r.department_id;`
                break;
            case "department":
                sql = `SELECT * FROM ${table}`
                break;
        }

        return sql
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