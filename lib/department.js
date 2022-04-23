const inquirer = require("inquirer");

//PROMPT "View All Departments" | SQL QUERY `SELECT * FROM department` CAN BE USED FOR ADD/UPDATE FUNCTIONS
const viewDepartments = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT * FROM department`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            return resolve(res);
        });
    });
};

//PROMPT "Add Department" | ADD NAME OF DEPARTMENT(input)
const promptAddDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
            validate: textInput => {
                if (textInput) {
                    return true;
                } else {
                    console.log("Please enter the name of the department.");
                    return false;
                };
            }
        }
    ]).then((response) => {
        return new Promise((resolve, reject) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO department SET ?`;
            const params = { name: response.department };
            db.query(sql, params, (err, row) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "New Department Created",
                    changes: row.affectedRows,
                    data: params
                });
                return resolve(row);
            });
        });
    });
};

module.exports = { promptAddDepartment, viewDepartments };