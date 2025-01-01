//defining mongoose
var mongoose = require('mongoose');

// Configure MongoDB connection
mongoose.connect('mongodb://localhost:27017/proj2024MongoDB', {
    useNewUrlParser: true, // useNewUrlParser is set to true to opt in to using the MongoDB driver's new connection string parser
    useUnifiedTopology: true // useUnifiedTopology is set to true to opt in to using the MongoDB driver's new connection management engine
}).then(() => {
    console.log('Connected to MongoDB database');
}).catch(err => {
    console.error('MongoDB connection error:', err);
});
