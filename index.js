// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { getStudents, getGrades} = require("./mysql");
const { getLecturers } = require("./mongodb");

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

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

// Home route
app.get("/", (req, res) => {
    res.send(`
        <h1>G0042349</h1>
        <ul>
            <li><a href="/students">Students Page</a></li>
            <li><a href="/grades">Grades Page</a></li>
            <li><a href="/lecturers">Lecturer Page</a></li>
        </ul>
    `);
});

// Students route
app.get("/students", async (req, res) => {
    try {
        const students = await getStudents(); // Call the MySQL method
        res.render("students", { students }); // Render the EJS page with data
    } catch (err) {
        console.error("Error retrieving students:", err);
        res.status(500).send("Error retrieving students from database");
    }
});

// Grades route
app.get("/grades", async (req, res) => {
    try {
      const grades = await getGrades(); // Get all grade details
      res.render("grades", { grades }); // Pass to the EJS template
    } catch (err) {
      console.error("Error retrieving grades:", err);
      res.status(500).send("Error retrieving grades from the database");
    }
  });

 //app.get method to get the lecturers
 app.get("/lecturers", async (req, res) => {
    try {
        const lecturer = await getLecturers(); // Call the MongoDB method
        res.render("lecturers", { lecturer }); // Render the EJS page with data
    } catch (err) {
        console.error("Error retrieving lecturers:", err);
        res.status(500).send("Error retrieving lecturers from database");
    }
});



