const inquirer = require("inquirer");
require('console.table');

const { viewDepartments, promptAddDepartment } = require("./lib/department");
const { viewRoles, promptAddRole } = require("./lib/role");
const { viewEmployees, promptAddEmployee } = require("./lib/employee");

//FIRST MAIN PROMPT
const mainPrompt = () => {
    return inquirer.prompt([
        {
            type: "list",
            name: "mainPrompt",
            message: "What would you like to do?",
            choices:
                [
                    "View All Departments",
                    "View All Roles",
                    "View All Employees",
                    "Add Department",
                    "Add Role",
                    "Add Employee",
                    "Update Employee Role",
                    "Quit"
                ]
        },
    ]).then(responses => {
        switch (responses.mainPrompt) {
            case "View All Departments":
                return viewDepartments().then((res) => {
                    console.table(res);
                });
            case "View All Roles":
                return viewRoles().then((res) => {
                    console.table(res)
                });
            case "View All Employees":
                return viewEmployees().then((res) => {
                    console.table(res)
                });
            case "Add Department":
                return promptAddDepartment();
            case "Add Role":
                return promptAddRole();
            case "Add Employee":
                return promptAddEmployee();
            case "Quit":
                return process.exit();
        };
    }).then(() => {
        mainPrompt();
    })
};

mainPrompt();