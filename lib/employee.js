//VIEW ALL EMPLOYEES
const inquirer = require("inquirer");
const { viewQueryRoles } = require("./role");


//SQL QUERY `SELECT * FROM employee` USED FOR ADD/UPDATE FUNCTIONS
const viewQueryEmployees = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT * FROM employee`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

//PROMPT "View All Employees" | VIEW EMPLOYEES WITH EXTENDED COLUMNS FROM OTHER TABLES (JOIN)
const viewEmployees = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT employee.id, 
        employee.first_name, 
        employee.last_name, 
        role.title, 
        department.name, 
        role.salary,
        CONCAT (manager.first_name, " ", manager.last_name) AS manager
        FROM employee
        LEFT JOIN role ON employee.role_id = role.id
        LEFT JOIN department ON role.department_id = department.id
        LEFT JOIN employee manager ON employee.manager_id = manager.id`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

//PROMPT "Add Employee" | ADD FIRST NAME(input), LAST NAME(input), ROLE(list - from "viewQueryRoles"), and Manager(list - from "viewQueryEmployees")
function promptAddEmployee() {
    return Promise.resolve().then(() => {
        //RESOLVES ALL PROMISES BEFORE INQURIER PROMPT
        return Promise.all([
            viewQueryRoles(),
            viewQueryEmployees()
        ]);
    }).then(([roles, employees]) => {
        return inquirer.prompt([
            {
                type: "input",
                name: "first_name",
                message: "What is the employee's first name?",
                validate: textInput => {
                    if (textInput) {
                        return true;
                    } else {
                        console.log("Please enter the first name of the employee");
                        return false;
                    };
                }
            },
            {
                type: "input",
                name: "last_name",
                message: "What is the employee's last name?",
                validate: textInput => {
                    if (textInput) {
                        return true;
                    } else {
                        console.log("Please enter the last name of the employee.");
                        return false;
                    };
                }
            },
            {
                type: "list",
                name: "role",
                message: "What is the employee's role?",
                choices: roles.map((employeesRoleInfo) => {
                    return {
                        name: employeesRoleInfo.title,
                        value: employeesRoleInfo.id
                    }
                })
            },
            {
                type: "list",
                name: "manager_id",
                message: "Which manager does this employee belong to?",
                choices: employees.map((employeesInfo) => {
                    return {
                        name: employeesInfo.first_name + " " + employeesInfo.last_name,
                        value: employeesInfo.id
                    }
                })
            }
        ]);
    }).then((response) => {
        return new Promise((resolve, reject) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
            VALUES
                ("${response.first_name}",
                "${response.last_name}",
                "${response.role}",
                "${response.manager_id}")`;
            db.query(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "New Employee Created",
                    changes: rows.affectedRows,
                    first_name: response.first_name,
                    last_name: response.last_name,
                    role: response.role,
                    manager: response.manager_id
                });
                return resolve(rows);
            });
        });
    });
};

//PROMPT "Update Employee Role" | UPDATE EMPLOYEE(list from - "viewQueryEmployees") AND ROLE(list from - "viewQueryRoles")
function updateEmployeeRole() {
    return Promise.resolve().then(() => {
        //RESOLVES ALL PROMISES BEFORE INQURIER PROMPT
        return Promise.all([
            viewQueryEmployees(),
            viewQueryRoles()
        ]);
    }).then(([employees, roles]) => {
        return inquirer.prompt([
            {
                type: "list",
                name: "name",
                message: "Which employee's role do you want to update?",
                choices: employees.map((employeesInfo) => {
                    return {
                        name: employeesInfo.first_name + " " + employeesInfo.last_name,
                        value: employeesInfo.id
                    }
                })
            },
            {
                type: "list",
                name: "role",
                message: "Which role do you want to assign the selected employee?",
                choices: roles.map((employeesRoleInfo) => {
                    return {
                        name: employeesRoleInfo.title,
                        value: employeesRoleInfo.id
                    }
                })
            },
        ]).then((response) => {
            return new Promise((resolve, reject) => {
                const db = require("../db/connections");
                const sql = `UPDATE employee SET 
                employee.role_id = "${response.role}" 
                WHERE employee.id = "${response.name}"`;
                db.query(sql, (err, rows) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log("Employee Update Complete");
                    return resolve(rows);
                });
            });
        });
    });
};

module.exports = { viewQueryEmployees, promptAddEmployee, viewEmployees, updateEmployeeRole };