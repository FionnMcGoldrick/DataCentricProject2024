// Import routes
const homeRoutes = require('./routes/home');
const studentRoutes = require('./routes/students');
const gradeRoutes = require('./routes/grades');
const lecturerRoutes = require('./routes/lecturers');

// Use routes
app.use('/', homeRoutes);
app.use('/students', studentRoutes);
app.use('/grades', gradeRoutes);
app.use('/lecturers', lecturerRoutes);