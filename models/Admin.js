const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: [true, 'Must enter a full name'],
    minLength: [3, 'full name should be more than 3 characters'],
    maxLength: [60, 'Full name should be less than 60 characters'],
  },
  email: {
    type: String,
    lowercase: true,
    required: 'email address is required',
  },

  password: {
    type: String,
    minLength: [6, 'Password must be more than 6 characters'],
  },
});

const AdminModel = mongoose.model('admin', adminSchema);

module.exports = AdminModel;
