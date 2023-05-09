//require built in modules
const express = require('express');
const connectDB = require('./config/db_config');
require('dotenv').config();

//My file imports
const speakerRoutes = require('./routes/speaker');
const studentRoutes = require('./routes/student');
const eventRoutes = require('./routes/event');
//create app
const app = express();

const PORT = process.env.PORT;

//middle wares
app.use(express.json());

//routes

app.use('/speaker', speakerRoutes);
app.use('/student', studentRoutes);
app.use('/event', eventRoutes);

//database connection
connectDB();

//listen to server on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
