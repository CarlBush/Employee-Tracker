//VIEW ALL EMPLOYEES
const inquirer = require("inquirer");

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

const promptAddEmployee = () => {
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
    ]).then((response) => {
        return new Promise((resolve, reject) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO employee SET ?`
            db.query(sql, {first_name: response.first_name, last_name: response.last_name}, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "New Employee Created",
                    changes: rows.affectedRows,
                    first_name: response.first_name,
                    last_name: response.last_name
                });
                return resolve(rows);
            });
        });
    });
};

//What is the employee's role?
//Who is the employee's manager?



module.exports = { viewEmployees, promptAddEmployee };