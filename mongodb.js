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

//Defining the schema for the lecturer collection
const lecturerSchema = new mongoose.Schema({
    _id: String,
    name: String,
    did: String
});

//collection name
const Lecturer = mongoose.model('lecturers', lecturerSchema);

//get all lecturers
const getLecturers = async () => {
    try {
        return await Lecturer.find({}).sort({ _id: 1 }); 
    } catch (err) {
        console.error('Error fetching lecturers:', err);
        throw err;
    }
};


//get lecturers by id 
const getLecturerById = async (id) => {
    return new Promise((resolve, reject) => {
        lecturer.findById(id, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


//add exports
module.exports = { getLecturers, getLecturerById };

