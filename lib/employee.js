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
    const db = require("../db/connections");
    const sql = `SELECT * FROM employee`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
};

module.exports = { Employee, viewEmployee };
