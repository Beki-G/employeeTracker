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
            default:
                sql = `SELECT * FROM ${table}`
                break;
        }

        return sql
    },

    getStaff:()=>{
        return `
        SELECT CONCAT(s.first_name, ' ', s.last_name) Staff
        FROM employee s`
    },
    createSQLbyType:(type)=>{
        let sql;

        switch (type){
            case"Employee":
                sql = `
                INSERT INTO employee (first_name, last_name, role_id, manager_id)
                VALUES(?, ?, ?, ?);`
                break;
            case"Role":
                sql = `
                INSERT INTO role (title, salary, department_id)
                VALUES(?, ?, ?);`
                break;
            case "Department":
                sql =`
                INSERT INTO department (name)
                VALUES (?);`
                break;
        }
        return sql;
    },

    createArgsByType:(type, response)=>{
        let args =[];

        switch (type){
            case"Employee":
                const {first_name, last_name, role_id, manager_id} = response;
                args.push(first_name)
                args.push(last_name)
                args.push(role_id)
                args.push(manager_id)
                break;
            case"Role":
                const {role_name, role_salary, department_id} = response;
                args.push(role_name);
                args.push(role_salary);
                args.push(department_id)
                break;
            case "Department":
                const {dept_name} =response;
                args.push(dept_name)
                break;
        }
        return args;
    },

    updateEmployeeRole:(employeeID, role_id)=>{
        return `
        UPDATE employee
        SET role_id = \"${role_id}\"
        WHERE emp_id =\"${employeeID}\"`
    }, 

    updateEmployee:(type)=>{
        
        const arr = []
        let sql;

        switch(type){
            case "Employee Manager":
                sql = `SELECT emp_id
                FROM employee
                WHERE first_name = (?) AND employee.last_name = (?);`;
                arr.push(sql);
                sql =`UPDATE employee
                SET manager_id = (?)
                WHERE employee.first_name = (?) AND employee.last_name = (?);`
                arr.push(sql)
                break;
            case "Employee Role":
                sql = `SELECT role_id FROM role WHERE title = (?);`
                arr.push(sql);
                sql = `UPDATE employee
                SET role_id = (?)
                WHERE employee.first_name = (?) AND employee.last_name = (?);`
                arr.push(sql)
                break;
        }
        return arr
    },

    updateEmployeeArgs:(res)=>{
        const arr = [];

        let first_name = res.substr(0, res.indexOf(' '));
        let last_name = res.substr(res.indexOf(" ")+1);

        arr.push(first_name);
        arr.push(last_name);

        return arr;
    }, 

    getCurrentManagers:()=>{
        return `SELECT CONCAT(m.first_name, ' ', m.last_name) Manager    
        FROM employee s
        LEFT JOIN employee m ON m.emp_id = s.manager_id
        WHERE CONCAT(m.first_name, ' ', m.last_name) IS NOT NULL
        GROUP BY Manager`
    },

    getRoleTable: ()=>{
        return `SELECT title AS Title FROM role `
    }


}