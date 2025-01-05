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
    try {
        const results = await Lecturer.findById(id); // Returns a Promise
        return results;
    } catch (err) {
        console.error('Error fetching lecturer by id:', err);
        throw err;
    }
};

//delete lecturer by id
const deleteLecturerById = async (id) => {
    try {
        const results = await Lecturer.findByIdAndDelete(id); // Returns a Promise
        return results;
    } catch (err) {
        throw err; // Rethrow error to handle it upstream
    }
};

//update lecturer by id
const updateLecturer = async (id, name, did) => {
    try {
        const results = await Lecturer.findByIdAndUpdate(id, { name, did }, { new: true }); // Returns a Promise
        return results;
    }
    catch (err) {
        throw err; // Rethrow error to handle it upstream
    }
};



//add exports
module.exports = { getLecturers, getLecturerById, deleteLecturerById, updateLecturer };

