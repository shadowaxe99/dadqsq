const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  incorporationDate: {
    type: Date,
    required: true
  },
  jurisdiction: {
    type: String,
    required: true,
    trim: true
  },
  industry: {
    type: String,
    required: true,
    trim: true
  },
  shareholders: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shareholder'
  }],
  equityGrants: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EquityGrant'
  }],
  authorizedShares: {
    type: Number,
    required: true,
    min: 0
  },
  issuedShares: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(issuedShares) {
        return issuedShares <= this.authorizedShares;
      },
      message: props => `Issued shares (${props.value}) cannot exceed authorized shares (${this.authorizedShares})`
    }
  },
  outstandingShares: {
    type: Number,
    required: true,
    min: 0,
    validate: {
      validator: function(outstandingShares) {
        return outstandingShares <= this.issuedShares;
      },
      message: props => `Outstanding shares (${props.value}) cannot exceed issued shares (${this.issuedShares})`
    }
  },
  parValuePerShare: {
    type: Number,
    required: true,
    min: 0
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    validate: {
      validator: function(email) {
        const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
        return regex.test(email);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  phoneNumber: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator: function(phone) {
        const regex = /^\+?[1-9]\d{1,14}$/;
        return regex.test(phone);
      },
      message: props => `${props.value} is not a valid phone number`
    }
  }
}, {
  timestamps: true
});

const CompanyModel = mongoose.model('Company', CompanySchema);

module.exports = CompanyModel;