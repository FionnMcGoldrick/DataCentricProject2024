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
const getStudents = async () => {
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

// Method for getting all grades
const getGrades = async () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT 
             grade.sid, 
             student.name AS student_name, 
             module.name AS module_name, 
             grade.grade 
           FROM grade 
           INNER JOIN student ON grade.sid = student.sid 
           INNER JOIN module ON grade.mid = module.mid 
           ORDER BY student.name ASC, grade.grade ASC`,
      (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      }
    );
  });
};


// Export functions and database
module.exports = {
  getStudents,
  getGrades
};
