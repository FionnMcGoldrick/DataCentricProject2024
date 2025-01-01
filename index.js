// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const mongoose = require('mongoose');
const session = require('express-session');

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

// Configure MySQL connection
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'your_password',
    database: 'proj2024mysql'
});

//have the app listen on port 3004
app.listen(port, () => {
    res.send(`App listening at http://localhost:${port}`)
});


app.get('/', (req, res) => {
    res.send('Hello World!')
});



