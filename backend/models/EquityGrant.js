const mongoose = require('mongoose');

const equityGrantSchema = new mongoose.Schema({
  shareholder: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shareholder',
    required: true
  },
  numberOfShares: {
    type: Number,
    required: true
  },
  grantDate: {
    type: Date,
    required: true
  },
  vestingCommencementDate: {
    type: Date,
    required: true
  },
  vestingSchedule: {
    type: String,
    required: true,
    enum: ['monthly', 'quarterly', 'annually']
  },
  cliffDuration: {
    type: Number, // in months
    required: false
  },
  vestingDuration: {
    type: Number, // in months
    required: true
  },
  exercisePrice: {
    type: Number,
    required: true
  },
  strikePrice: {
    type: Number,
    required: false
  },
  status: {
    type: String,
    required: true,
    enum: ['active', 'exercised', 'cancelled', 'expired']
  }
}, {
  timestamps: true
});

const EquityGrantModel = mongoose.model('EquityGrant', equityGrantSchema);

module.exports = EquityGrantModel;