class Employee {
    constructor(firstname, lastname) {
        this.firstname = firstname;
        this.lastname = lastname;
    };

    getName() {
        return this.firstname;
    };

    getSalary() {
        return this.lastname;
    };

    //ROLE
    //MANAGER

};

//VIEW ALL EMPLOYEES
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

module.exports = { Employee, viewEmployees };