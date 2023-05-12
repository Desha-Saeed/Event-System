const bcrypt = require('bcryptjs');
const Student = require('../models/student');
const Speaker = require('../models/speaker');
const Admin = require('../models/Admin');

const jwt = require('jsonwebtoken');

exports.register = (model) => {
  return async (req, res) => {
    // Our register logic starts here
    try {
      // Get Student input
      const { fullname, email, password } = req.body;

      // Validate Student inputoldStudent
      if (!(email && password && fullname)) {
        res.status(400).json('All input is required');
      }

      // check if Student already exist
      // Validate if Student exist in our database
      const oldUser = await model.findOne({ email });
      if (oldUser) {
        return res.status(409).json('User Already Exist. Please Login');
      }
      //Encrypt Student password
      encryptedPassword = await bcrypt.hash(password, 10);
      // Create Student in our database
      const user = await model.create({
        fullname,
        email: email.toLowerCase(), // sanitize: convert email to lowercase
        password: encryptedPassword,
      });

      // return new Student
      res.status(201).json({
        status: `Student created with full name ${user.fullname}`,
      });
    } catch (err) {
      res.status(400).json({
        error: err.message,
      });
    }
  };
};

exports.login = async (req, res) => {
  // Our login logic starts here
  try {
    // Get user input
    const { email, password, role } = req.body;
    // Validate user input
    if (!(email && password && role)) {
      res.status(400).json('All input is required');
    }
    // Validate if user exist in our database
    let user;
    switch (role) {
      case 'admin':
        user = await Admin.findOne({ email });
        break;

      case 'student':
        user = await Student.findOne({ email });
        break;

      case 'speaker':
        user = await Speaker.findOne({ email });
        break;
      default:
        break;
    }

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { id: user._id, role: role },
        process.env.TOKEN_KEY,
        {
          expiresIn: '1d',
        }
      );
      //save token
      // user.token = token

      // user
      res.status(200).json({
        status: `Logged in as user ${role}`,
        token,
      });
    }
    res.status(400).json('Invalid Credentials');
  } catch (err) {
    console.log(err);
  }
};
