//Model
const Speaker = require('../models/speaker');
const { validationResult } = require('express-validator');

// @desc Return all speakers data
// @route GET /speaker
// @access All users
const getAllSpeakers = async (req, res) => {
  try {
    const speakers = await Speaker.find({}).select('-password').select('-__v');

    res.status(200).json({
      status: 'Success',
      data: {
        speakers,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

// @desc Return Specific speaker data
// @route GET /speaker/:id
// @access All users

const getOneSpeaker = async (req, res) => {
  try {
    const speaker = await Speaker.findById(req.params.id)
      .select('-password')
      .select('-__v');

    res.status(200).json({
      status: 'Success',
      data: {
        speaker,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

// @desc Add a speaker
// @route POST /speaker
// @access Admins only

const addNewSpeaker = async (req, res) => {
  try {
    // check for body data validations
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const speaker = await Speaker.create(req.body);

    res.status(200).json({
      status: 'Success, speaker created',
      data: {
        _id: speaker._id,
        fullname: speaker.fullname,
        email: speaker.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed to create speaker',
      error: error.message,
    });
  }
};

// @desc Update speaker data
// @route PUT /speaker/:id
// @access Admins or Speaker himself

const updateSpeaker = async (req, res) => {
  try {
    // check for body data validations
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const speaker = await Speaker.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.status(200).json({
      status: 'Success, Speaker data updated',
      data: {
        _id: speaker._id,
        fullname: speaker.fullname,
        email: speaker.email,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed update speaker data',
      error: error.message,
    });
  }
};

// @desc Delete speaker
// @route DELETE /speaker/:id
// @access Admins Only

const deleteSpeaker = async (req, res) => {
  try {
    await Speaker.findByIdAndRemove(req.params.id);

    res.status(200).json({
      status: `Deleted user with id ${req.params.id} Successfully`,
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

module.exports = {
  getAllSpeakers,
  getOneSpeaker,
  updateSpeaker,
  addNewSpeaker,
  deleteSpeaker,
};
