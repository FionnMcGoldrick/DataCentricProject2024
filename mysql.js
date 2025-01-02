// Defining MySQL and Promise-MySQL
const mysql = require("mysql");
const pmysql = require("promise-mysql");

// Configure MySQL connection
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "proj2024mysql",
});

// Creating MySQL pool
let pool;
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

// Connect to MySQL database
db.connect((err) => {
    if (err) {
        console.error("MySQL connection error:", err);
    } else {
        console.log("Connected to MySQL database");
    }
});

// Export functions and database
module.exports = {
    getAllStudents,
};
