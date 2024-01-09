# Database Schema Documentation

## User Schema

```javascript
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user'
  }
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);
```

## Company Schema

```javascript
const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  incorporationDate: {
    type: Date,
    required: true
  },
  industry: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Company', CompanySchema);
```

## Shareholder Schema

```javascript
const mongoose = require('mongoose');

const ShareholderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  companyId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Company',
    required: true
  },
  sharesOwned: {
    type: Number,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('Shareholder', ShareholderSchema);
```

## Equity Grant Schema

```javascript
const mongoose = require('mongoose');

const EquityGrantSchema = new mongoose.Schema({
  shareholderId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Shareholder',
    required: true
  },
  grantDate: {
    type: Date,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  vestingSchedule: {
    type: String,
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model('EquityGrant', EquityGrantSchema);
```

This document outlines the database schemas used in the Olvy cap table management software. Each schema is defined using Mongoose, a MongoDB object modeling tool designed to work in an asynchronous environment. The schemas are designed to represent the users, companies, shareholders, and equity grants within the system. Each model is timestamped to record creation and update times automatically.