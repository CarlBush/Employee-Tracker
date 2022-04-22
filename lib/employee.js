//VIEW ALL EMPLOYEES
const inquirer = require("inquirer");
const { viewQueryRoles } = require("./role");

const viewEmployees = () => {
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



function promptAddEmployee() {
    return Promise.resolve().then(() => {
        return viewQueryRoles();
    }).then((role) => {
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
                choices: role.map((employeesRoleInfo) => employeesRoleInfo.title)
            },

        ]);
    }).then((response) => {
        const db = require("../db/connections");
        const sql = `INSERT INTO employee (first_name, last_name, role_id)
            VALUES
                ("${response.first_name}",
                "${response.last_name}",
                (SELECT id FROM role WHERE title = "${response.role}"));`
        db.query(sql, (err, rows) => {
            if (err) {
                return (err);
            }
            // console.log({
            //     message: "New Employee Created",
            //     changes: rows.affectedRows,
            //     first_name: response.first_name,
            //     last_name: response.last_name,
            //     role: response.role
            // });
        });
    }).then(() => {
        return viewEmployees();
    }).then((employees) => {
        return inquirer.prompt([
            {
                type: "list",
                name: "manager_id",
                message: "Which manager does this employee belong to?",
                choices: employees.map((employeesInfo) => employeesInfo.first_name + " " + employeesInfo.last_name)
            }
        ]).then((response) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO employee (manager_id)
            VALUES
            (SELECT id FROM employee WHERE CONCAT ("${response.first_name}"," ","${response.last_name}"));`
            db.query(sql, (err, row) => {
                if (err) {
                    return (err);
                }
            })
            console.log("Employee Created")
        });
    });
};

module.exports = { viewEmployees, promptAddEmployee };