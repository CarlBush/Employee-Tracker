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
    const db = require("../db/connections");
    const sql = `SELECT * FROM role`;
    db.query(sql, (err, res) => {
        if (err) throw err;
        console.table(res);
    })
};


module.exports = { Role, viewRole };
