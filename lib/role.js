const inquirer = require("inquirer");
const { viewDepartments } = require("./department");

//PROMPT "View All Role"
const viewQueryRoles = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT * FROM role`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

const viewRoles = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT role.id, role.title, role.salary, department.name AS department 
            FROM role
            LEFT JOIN department ON role.department_id = department.id`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};


function promptAddRole() {
    return Promise.resolve().then(() => {
        return viewDepartments();
    }).then((departments) => {
        return inquirer.prompt([
            {
                type: "input",
                name: "title",
                message: "What is the name of the role?",
                validate: textInput => {
                    if (textInput) {
                        return true;
                    } else {
                        console.log("Please enter the name of the role.");
                        return false;
                    };
                }
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary of the role?",
                validate: textInput => {
                    if (textInput) {
                        return true;
                    } else {
                        console.log("Please enter the salary of the role.");
                        return false;
                    };
                }
            },
            {
                type: "list",
                name: "department_id",
                message: "Which department does the role belong to?",
                choices: departments.map((departmentInfo) => departmentInfo.name)
            }
        ]);
    }).then((response) => {
        return new Promise((resolve, reject) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO role(title, salary, department_id) 
            VALUES
                ("${response.title}", 
                "${response.salary}", 
                (SELECT id FROM department WHERE name = "${response.department_id}"));`
            db.query(sql, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "Created new role",
                    changes: rows.affectedRows,
                    title: response.title,
                    salary: response.salary,
                    department: response.department_id
                });
                return resolve(rows);
            })
        });
    });
};


module.exports = { viewQueryRoles, promptAddRole, viewRoles };