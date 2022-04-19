const inquirer = require("inquirer");
require('console.table');

const { Department , promptAddDepartment, viewDepartment } = require("./lib/department");
const { Role, viewRole, promptAddRole } = require("./lib/role");
const { Employee, viewEmployee } = require("./lib/employee");


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
        //PROMPT "Add Department" | ADD NAME OF DEPARTMENT
        // {
        //     type: "input",
        //     name: "department",
        //     message: "What is the name of the department?",
        //     when: (answer) => answer.mainPrompt === "Add Department"
        // },
        //PROMPT "Add Role" | ADD NAME OF ROLE
        // {
        //     type: "input",
        //     name: "role",
        //     message: "What is the name of the role?",
        //     when: (answer) => answer.mainPrompt === "Add Role"
        // },
        // //PROMPT "Add Role" | ADD SALARY OF ROLE
        // {
        //     type: "input",
        //     name: "salary",
        //     message: "What is the salary of the role?",
        //     when: (answer) => answer.mainPrompt === "Add Role"
        // },
        //PROMPT "Add Employee" | ADD FIRST NAME
        {
            type: "input",
            name: "firstname",
            message: "What is the employee's first name?",
            when: (answer) => answer.mainPrompt === "Add Employee"
        },
        //PROMPT "Add Employee" | ADD LAST NAME
        {
            type: "input",
            name: "lastname",
            message: "What is the employee's last name?",
            when: (answer) => answer.mainPrompt === "Add Employee"
        },
    ]).then(responses => {
        switch(responses.mainPrompt) {
            case "View All Departments":
                return viewDepartment();
            case "Add Department":
                return promptAddDepartment();
            case "View All Roles":
                return viewRole();
            case "View All Employees":
                return viewEmployee();
            case "Add Role":
                return promptAddRole();
        };
    }).then(() => {
        mainPrompt();
    })
};

mainPrompt();