const inquirer = require("inquirer");

class Role {
    constructor(name, salary) {
        this.name = name;
        this.salary = salary;
    };

    getName() {
        return this.name;
    };

    getSalary() {
        return this.salary;
    };

    //DEPARTMENT

};


//PROMPT "View All Role"
const viewRole = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT * FROM role`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            console.table(res); 
            return resolve(res);
        });
    });
};

const promptAddRole = () => {
    return inquirer.prompt([
        {
            type: "input",
            name: "title",
            message: "What is the name of the role?"
        },
        {
            type:"input",
            name: "salary",
            message: "What is the salary of the role?"
        }
    ]).then((response) => {
        return new Promise((resolve, reject) => {
            const db = require("../db/connections");
            const sql = `INSERT INTO role SET ?`
            db.query(sql, {title: response.title, salary: response.salary}, (err, rows) => {
                if (err) {
                    return reject(err);
                }
                console.log({
                    message: "Created new role",
                    changes: rows.affectedRows,
                    title: response.title,
                    salary: response.salary
                });
                return resolve(rows);
            })
        });
    });
};


module.exports = { Role, viewRole, promptAddRole };