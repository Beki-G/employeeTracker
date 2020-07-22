USE employee_trackerDB;

-- Add departments --
INSERT INTO department(name)
VALUES("Human Resources");

INSERT INTO department(name)
VALUES("IT");

INSERT INTO department(name)
VALUES("Accounting");

INSERT INTO department(name)
VALUES("Administrative");

-- Add Roles --
INSERT INTO role (title, salary, department_id)
VALUES ("Founder", "100000", "4");

INSERT INTO role (title, salary, department_id)
VALUES ("Tech Support", "70000", "4");

INSERT INTO role (title, salary, department_id)
VALUES ("HR Generalist", "80000", "1");

INSERT INTO role (title, salary, department_id)
VALUES ("CFO", "850000", "3");

-- Add Employees -- 
INSERT INTO employee (first_name, last_name, role_id)
VALUES ("Tasha", "Smith", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Gonzago", "Lane", "3", "1");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Tom", "Boots", "2", "3");

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Esperanza", "SinPaz", "4", "1");
