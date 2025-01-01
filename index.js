// Import required modules
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
var mysql = require('./mysql');
var myMongoDB = require('./mongodb');
var routes = require('./routes');
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


// Configure session
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true
}));



//have the app listen on port 3004
app.listen(port, () => {
    res.send(`App listening at http://localhost:${port}`)
    console.log(`App listening at http://localhost:${port}`)
});


app.get('/', (req, res) => {
    res.send('Hello World!')
});



