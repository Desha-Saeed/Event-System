//Model
const { validationResult } = require('express-validator');
const Student = require('../models/student');

// @desc Return all Students data
// @route GET /Student
// @access All users
const getAllStudents = async (req, res) => {
  try {
    const students = await Student.find({}).select('-password').select('-__v');

    res.status(200).json({
      status: 'Success',
      data: {
        students,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

// @desc Return Specific Student data
// @route GET /Student/:id
// @access All users

const getOneStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id)
      .select('-password')
      .select('-__v');

    res.status(200).json({
      status: 'Success',
      data: {
        student,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

// @desc Add a Student
// @route POST /Student
// @access Through register route

const addNewStudent = async (req, res) => {
  try {
    // check for body data validations
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const student = await Student.create(req.body);

    res.status(200).json({
      status: 'Success, Student created',
      data: {
        student,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed to create Student',
      error: error.message,
    });
  }
};

// @desc Update Student data
// @route PUT /Student/:id
// @access Admins or Student himself

const updateStudent = async (req, res) => {
  try {
    // check for body data validations
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }

    const student = await Student.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'Success, Student data updated',
      data: {
        _id: student._id,
        fullname: student.fullname,
        email: student.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed update Student data',
      error: error.message,
    });
  }
};

// @desc Delete Student
// @route DELETE /Student/:id
// @access Admins Only

const deleteStudent = async (req, res) => {
  try {
    await Student.findByIdAndRemove(req.params.id);

    res.status(200).json({
      status: `Deleted user with id  Successfully`,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

const deleteAllStudents = async (req, res) => {
  try {
    await Student.deleteMany({});

    res.status(200).json({
      status: `Deleted All students`,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

module.exports = {
  getAllStudents,
  getOneStudent,
  updateStudent,
  addNewStudent,
  deleteStudent,
  deleteAllStudents,
};
