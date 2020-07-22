DROP DATABASE IF EXISTS employee_trackerDB;

CREATE DATABASE employee_trackerDB;

USE employee_trackerDB;

CREATE TABLE department(
	dept_id INT AUTO_INCREMENT,
    name VARCHAR(30) NOT NULL,
    
    PRIMARY KEY(dept_id)
);

CREATE TABLE role(
	role_id INT AUTO_INCREMENT,
    title VARCHAR(30),
    salary DECIMAL,
    department_id INT NOT NULL,
    
    PRIMARY KEY(role_id), 
    FOREIGN KEY (department_id) REFERENCES department(dept_id)    
);

CREATE TABLE employee(
	emp_id INT NOT NULL AUTO_INCREMENT,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT NOT NULL,
    manager_id INT, 
    
    PRIMARY KEY (emp_id), 
	FOREIGN KEY (role_id) REFERENCES role(role_id),
    FOREIGN KEY (manager_id) REFERENCES employee(emp_id)
);

