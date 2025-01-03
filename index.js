// Import required modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const { getAllStudents} = require("./mysql");
const { getAllGrades} = require("./mysql");	

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
        const students = await getAllStudents(); // Call the MySQL method
        res.render("students", { students }); // Render the EJS page with data
    } catch (err) {
        console.error("Error retrieving students:", err);
        res.status(500).send("Error retrieving students from database");
    }
});

// Grades route
app.get("/grades", async (req, res) => {
    try {
        const grades = await getAllGrades(); // Call the MySQL method
        res.render("grades", { grades }); // Render the EJS page with data
    }
    catch (err) {
        console.error("Error retrieving grades:", err);
        res.status(500).send("Error retrieving grades from database");
    }
});

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
