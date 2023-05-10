//Model
const Event = require('../models/event');
const { validationResult } = require('express-validator');

// @desc Return all Events data
// @route GET /Event
// @access All users
const getAllEvents = async (req, res) => {
  try {
    const events = await Event.find({}).select('-password').select('-__v');

    res.status(200).json({
      status: 'Success',
      length: events.length,
      data: {
        events,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

// @desc Return Specific Event data
// @route GET /Event/:id
// @access All users

const getOneEvent = async (req, res) => {
  try {
    const eventData = await Event.findById(req.params.id)
      .select('-password')
      .select('-__v');

    res.status(200).json({
      status: 'Success',
      data: {
        eventData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed',
      error: error.message,
    });
  }
};

// @desc Add a Event
// @route POST /Event
// @access Through register route

const addNewEvent = async (req, res) => {
  try {
    // check for body data validations
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventData = await Event.create(req.body);

    res.status(200).json({
      status: 'Success, Event created',
      data: {
        eventData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed to create Event',
      error: error.message,
    });
  }
};

// @desc Update Event data
// @route PUT /Event/:id
// @access Admins or Event himself

const updateEvent = async (req, res) => {
  try {
    // check for body data validations
    const result = validationResult(req);

    if (!result.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const eventData = await Event.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    console.log(eventData);

    res.status(200).json({
      status: 'Success, Event data updated',
      data: {
        eventData,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: 'Failed update Event data',
      error: error.message,
    });
  }
};

// @desc Delete Event
// @route DELETE /Event/:id
// @access Admins Only

const deleteEvent = async (req, res) => {
  try {
    await Event.findByIdAndRemove(req.params.id);

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

module.exports = {
  getAllEvents,
  getOneEvent,
  updateEvent,
  addNewEvent,
  deleteEvent,
};
