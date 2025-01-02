// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var mysql = require('./mysql');
var myMongoDB = require('./mongodb');

//Initialize the app
const app = express();
const port = 3004;

// Middleware for parsing request bodies
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Middleware for serving static files
app.use(express.static(path.join(__dirname, 'public')));

// Set view engine to EJS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//have the app listen on port 3004
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
});

//app.get() method to handle GET requests

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

app.get('/students', (req, res) => {
    res.send('Hello Students!')
});

app.get('/grades', (req, res) => {
    res.send('Hello Grades!')
});

app.get('/lecturers', (req, res) => {
    res.send('Hello Lecturers!')
});






