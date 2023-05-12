//require built in modules
const express = require('express');
const connectDB = require('./config/db_config');
const morgan = require('morgan');
require('dotenv').config();

const cors = require('cors');
const rfs = require('rotating-file-stream');
const ejs = require('ejs');
const multer = require('multer');

const path = require('path');
//Route imports
const speakerRoutes = require('./routes/speaker');
const studentRoutes = require('./routes/student');
const eventRoutes = require('./routes/event');
const { login, register } = require('./controllers/auth');

//Model imports
const Student = require('./models/student');
const Admin = require('./models/Admin');

//middlewares
const error = require('./middlewares/errors');

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

//Set disk storage

const storage = multer.diskStorage({
  destination: './images',
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + '-' + Date.now() + path.extname(file.originalname)
    );
  },
});

//Init upload

const upload = multer({
  storage,
}).single('Upload');

//set up view engine
app.set('view engine', 'ejs');
//views folder
app.use(express.static(__dirname + '/views'));
//render home
app.get('/', (req, res) => res.render('upload'));

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

//upload route
app.post('/upload', (req, res) => {
  upload(req, res, (err) => {
    if (err) res.json({ err });

    console.log(req.file);
  });
});

//database connection
connectDB();

//error handling middlewares

// function defined above (which logs the error)
app.use(error.errorLogger);

// sends response with the error
app.use(error.errorResponder);

// function which sends back the response for invalid paths)
app.use(error.invalidPathHandler);

//listen to server on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
