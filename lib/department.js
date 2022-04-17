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
function viewDepartment () {
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
    ])
};

module.exports = { Department, promptAddDepartment, viewDepartment };
