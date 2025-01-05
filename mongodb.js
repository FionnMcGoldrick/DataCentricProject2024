//defining mongoose
var mongoose = require("mongoose");

//connecting to the database
mongoose
  .connect("mongodb://localhost:27017/proj2024MongoDB", {
    useNewUrlParser: true, // useNewUrlParser is set to true to opt in to using the MongoDB driver's new connection string parser
    useUnifiedTopology: true, // useUnifiedTopology is set to true to opt in to using the MongoDB driver's new connection management engine
  })
  .then(() => {
    console.log("Connected to MongoDB database");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

//defining the schema for the lecturer
const lecturerSchema = new mongoose.Schema({
  _id: String,
  name: String,
  did: String,
});

//defining the model for the lecturer
const Lecturer = mongoose.model("lecturers", lecturerSchema);

/*
 *   Methods for interacting with the database
 */

//method for getting all the lecturers
const getLecturers = async () => {
  try {
    return await Lecturer.find({}).sort({ _id: 1 });
  } catch (err) {
    console.error("Error fetching lecturers:", err);
    throw err;
  }
};

//method for getting a lecturer by id
const getLecturerById = async (id) => {
  try {
    const results = await Lecturer.findById(id); // Returns a Promise
    return results;
  } catch (err) {
    console.error("Error fetching lecturer by id:", err);
    throw err;
  }
};

//method for deleting a lecturer by id
const deleteLecturerById = async (id) => {
  try {
    const results = await Lecturer.findByIdAndDelete(id); // Returns a Promise
    return results;
  } catch (err) {
    throw err;
  }
};

//method for updating a lecturer by id
const updateLecturer = async (id, name, did) => {
  try {
    const results = await Lecturer.findByIdAndUpdate(
      id,
      { name, did },
      { new: true }
    ); // Returns a Promise
    return results;
  } catch (err) {
    throw err;
  }
};

//method for adding a lecturer
const addLecturer = async (id, name, did) => {
  try {
    const lecturer = new Lecturer({ _id: id, name, did }); // Create a new instance of the Lecturer model
    return await lecturer.save();
  } catch (err) {
    throw err;
  }
};

//exporting the methods
module.exports = {
  getLecturers,
  getLecturerById,
  deleteLecturerById,
  updateLecturer,
  addLecturer,
};
