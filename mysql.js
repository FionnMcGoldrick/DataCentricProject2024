// Defining MySQL and Promise-MySQL
const mysql = require("mysql");
const pmysql = require("promise-mysql");

// Creating MySQL pool
var pool;
pmysql
    .createPool({
        connectionLimit: 1,
        host: "localhost",
        user: "root",
        password: "root",
        database: "proj2024mysql",
    })
    .then((p) => {
        pool = p;
    })
    .catch((e) => {
        console.log("Pool error: " + e);
    });

// Method for getting all students
const getAllStudents = async () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM student ORDER BY sid ASC", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

//get all grades method
const getAllGrades = async () => {
    return new Promise((resolve, reject) => {
        pool.query("SELECT * FROM grade ORDER BY sid ASC", (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};

// Export functions and database
module.exports = {
    getAllStudents,
    getAllGrades,
};
