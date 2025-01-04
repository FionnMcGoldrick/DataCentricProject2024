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

//method for adding a student
const addStudent = async (name, age, sid) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "INSERT INTO student (name, age, sid) VALUES (?, ?, ?)",
            [name, age, sid],
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

// Method for getting a student by ID
const getStudentById = async (sid) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "SELECT * FROM student WHERE sid = ?",
            [sid],
            (err, results) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(results[0]); // Return the first result
                }
            }
        );
    });
};

  
  // Method for updating a student
  const updateStudent = async (sid, name, age) => {
    return new Promise((resolve, reject) => {
        pool.query(
            "UPDATE student SET name = ?, age = ? WHERE sid = ?",
            [name, age, sid],
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


// Method for getting all grades
const getGrades = async () => {
  return new Promise((resolve, reject) => {
    pool.query(
      `SELECT 
         student.sid, 
         student.name AS student_name, 
         module.name AS module_name, 
         grade.grade 
       FROM student 
       LEFT JOIN grade ON student.sid = grade.sid 
       LEFT JOIN module ON grade.mid = module.mid 
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


//method for deleting a student from database
const deleteStudentById = async (sid) => {
  return new Promise(async (resolve, reject) => {
      try {
          // Delete related grades first
          await pool.query("DELETE FROM grade WHERE sid = ?", [sid]);
          
          // Delete the student
          await pool.query("DELETE FROM student WHERE sid = ?", [sid]);

          resolve();
      } catch (err) {
          reject(err);
      }
  });
};

// Exporting the methods
module.exports = {
    getStudents,
    getGrades,
    addStudent,
    getStudentById, 
    updateStudent, 
    deleteStudentById
  };
  
