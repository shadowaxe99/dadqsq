const mongoose = require('mongoose');

const ShareholderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide the shareholder name'],
    trim: true,
  },
  email: {
    type: String,
    required: [true, 'Please provide the shareholder email'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please provide a valid email address',
    ],
  },
  sharesOwned: {
    type: Number,
    required: [true, 'Please provide the number of shares owned'],
    min: [0, 'Shares owned cannot be less than 0'],
  },
  equityPercentage: {
    type: Number,
    required: [true, 'Please provide the equity percentage'],
    min: [0, 'Equity percentage cannot be less than 0'],
    max: [100, 'Equity percentage cannot be more than 100'],
  },
  company: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: [true, 'Shareholder must be associated with a company'],
  }
}, {
  timestamps: true
});

const ShareholderModel = mongoose.model('Shareholder', ShareholderSchema);

module.exports = ShareholderModel;