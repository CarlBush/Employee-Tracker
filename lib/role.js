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

module.exports = { Role, viewRole };