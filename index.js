const inquirer = require("inquirer");

const Department = require("./lib/department");
const Role = require("./lib/role");
const Employee = require("./lib/employee");

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
        }
    ])
};




mainPrompt();