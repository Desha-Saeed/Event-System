//require built in modules
const express = require('express');
const connectDB = require('./config/db_config');
const morgan = require('morgan');
require('dotenv').config();

const cors = require('cors');
const rfs = require('rotating-file-stream');
//Route imports
const speakerRoutes = require('./routes/speaker');
const studentRoutes = require('./routes/student');
const eventRoutes = require('./routes/event');
const { login, register } = require('./controllers/auth');

//Model imports
const Student = require('./models/student');
const Admin = require('./models/Admin');

//create app
const app = express();

const PORT = process.env.PORT;

// MORGAN SETUP
// create a log stream
const rfsStream = rfs.createStream(process.env.LOG_FILE, {
  size: process.env.LOG_SIZE || '10M', // rotate every 10 MegaBytes written
  interval: process.env.LOG_INTERVAL || '1d', // rotate daily
  compress: 'gzip', // compress rotated files
});

//middle wares
app.use(cors());
app.use(express.json());
app.use(morgan(process.env.LOG_FORMAT || 'dev', { stream: rfsStream }));

//routes
app.use('/speaker', speakerRoutes);
app.use('/student', studentRoutes);
app.use('/event', eventRoutes);
app.use('/registerStudent', register(Student));
app.use('/registerAdmin', register(Admin));
app.use('/login', login);

//database connection
connectDB();

//listen to server on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
