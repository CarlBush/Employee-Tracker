const inquirer = require("inquirer");
class Department {
    constructor(department) {
        this.department = department;
    };

    getDepartment() {
        return this.department;
    };

};

//PROMPT "View All Departments"
const viewDepartment = () => {
    const db = require("../db/connections");
    const sql = `SELECT * FROM department`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
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
        const db = require("../db/connections");
        const sql = `INSERT INTO department SET ?`;
        const parmas = { name: response.department };
        db.query(sql, parmas, (err, row) => {
            if (err) throw err;
            console.log({
                message: "New Department Created",
                changes: row.affectedRows,
                data: parmas
            });
        });
    });
};

module.exports = { Department, promptAddDepartment, viewDepartment };
