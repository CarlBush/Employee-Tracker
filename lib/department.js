const inquirer = require("inquirer");

//PROMPT "View All Departments"
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

//PROMPT "Add Department" | ADD NAME OF DEPARTMENT
const promptAddDepartment = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "department",
            message: "What is the name of the department?",
        }
    ]).then((response) => {
        return new Promise((resolve, reject) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO department SET ?`;
            const parmas = { name: response.department };
            db.query(sql, parmas, (err, row) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "New Department Created",
                    changes: row.affectedRows,
                    data: parmas
                });
                return resolve(row);
            });
        });
    });
};

module.exports = { Department, promptAddDepartment, viewDepartments };