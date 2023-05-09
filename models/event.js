const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  eventDate: {
    type: Date,
  },
  title: {
    type: String,
    minLength: [3, 'title must of more than 3 character'],
  },
  mainSpeaker: {
    type: String,
    minLength: [3, 'speaker name should be more than 3 characters'],
  },

  speakers: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'speaker',
  },
  students: {
    type: [Number],
    ref: 'student',
  },
});

const eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;
