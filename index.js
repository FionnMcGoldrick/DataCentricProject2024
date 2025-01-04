// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { getStudents, addStudent, getStudentById, updateStudent, getGrades, deleteStudentById } = require("./mysql");
const { getLecturers, deleteLecturerById } = require("./mongodb");

// Initialize the app
const app = express();
const port = 3004;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for serving static files
app.use(express.static(path.join(__dirname, "public")));

// Set view engine to EJS
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

// Start the server on port 3004
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>G00422349</h1>
        <ul>
            <li><a href="/students">Students Page</a></li>
            <li><a href="/grades">Grades Page</a></li>
            <li><a href="/lecturers">Lecturer Page</a></li>
        </ul>
    `);
});

//get all students
app.get("/students", async (req, res) => {
    try {
        const students = await getStudents(); // Call the MySQL method
        res.render("students", { students }); // Render the EJS page with data
    } catch (err) {
        console.error("Error retrieving students:", err);
        res.status(500).send("Error retrieving students from database");
    }
});

//app.get method to get the students by id
app.get("/students/add", (req, res) => {
    res.render("addstudents"); // Render the EJS page for adding a student
});


//app.post method for creating a new student
app.post("/students/add", async (req, res) => {
    const { name, age, sid } = req.body;
    try {
        await addStudent(name, age, sid); // Function to add a student to the database
        res.redirect("/students"); // Redirect to the students page after successful addition
    } catch (err) {
        console.error("Error adding student:", err);
        res.status(500).send("Error adding student to database");
    }
});     

// Get student by ID and render the update page
app.get("/students/update/:id", async (req, res) => {
    try {
        const student = await getStudentById(req.params.id);
        res.render("updatestudent", { student });
    } catch (err) {
        console.error("Error retrieving student:", err);
        res.status(500).send("Error retrieving student from database");
    }
});

// Update the student in the database
app.post("/students/update", async (req, res) => {
    const { sid, name, age } = req.body;
    try {
        await updateStudent(sid, name, age); // Update the student in the database
        res.redirect("/students"); // Redirect back to the student list
    } catch (err) {
        console.error("Error updating student:", err);
        res.status(500).send("Error updating student in database");
    }
});

// Get student by ID and render the update page
app.get("/students/update/:id", async (req, res) => {
    try {
      const student = await getStudentById(req.params.id);
      res.render("updatestudent", { student });
    } catch (err) {
      console.error("Error retrieving student:", err);
      res.status(500).send("Error retrieving student from database");
    }
  });
  
  // Update the student in the database
  app.post("/students/update", async (req, res) => {
    const { sid, name, age } = req.body;
    try {
      await updateStudent(sid, name, age);
      res.redirect("/students");
    } catch (err) {
      console.error("Error updating student:", err);
      res.status(500).send("Error updating student in database");
    }
  });
    
//method to get the grades
app.get("/grades", async (req, res) => {
    try {
      const grades = await getGrades(); // Get all grade details
      res.render("grades", { grades }); // Pass to the EJS template
    } catch (err) {
      console.error("Error retrieving grades:", err);
      res.status(500).send("Error retrieving grades from the database");
    }

});

 // method to get the lecturers
 app.get("/lecturers", async (req, res) => {
    try {
        const lecturer = await getLecturers(); // Call the MongoDB method
        res.render("lecturers", { lecturer }); // Render the EJS page with data
    } catch (err) {
        console.error("Error retrieving lecturers:", err);
        res.status(500).send("Error retrieving lecturers from database");
    }
});

//method to delete a lecturer by id
app.get("/lecturers/delete/:id", async (req, res) => {
    try {
        await deleteLecturerById(req.params.id); // Call the MongoDB method
        res.redirect("/lecturers"); // Redirect to the lecturers page after successful deletion
    } catch (err) {
        console.error("Error deleting lecturer:", err);
        res.status(500).send("Error deleting lecturer from database");
    }
});

//method to delete a student by id
app.get("/students/delete/:id", async (req, res) => {
    try {
        await deleteStudentById(req.params.id); // Call the MySQL method
        res.redirect("/students"); // Redirect to the students page after successful deletion
    } catch (err) {
        console.error("Error deleting student:", err);
        res.status(500).send("Error deleting student from database");
    }
});


