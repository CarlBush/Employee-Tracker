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
const viewEmployee = () => {
    return new Promise((resolve, reject) => {
        const db = require("../db/connections");
        const sql = `SELECT * FROM employee`;
        db.query(sql, (err, res) => {
            if (err) {
                return reject(err);
            }
            console.table(res); 
            return resolve(res);
        });
    });
};

module.exports = { Employee, viewEmployee };