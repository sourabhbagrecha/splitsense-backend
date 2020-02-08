const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const userSchema = new Schema({
  name: {
    type: {
      full: String,
      first: String,
      last: String,
    },
    required: true
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: Number
  },
  defaultCurrency: {
    type: String
  },
  picture: {
    type: String //Photo URL
  },
  payments: [{
    type: ObjectId,
    ref: 'Payment'
  }],
  expenses: [{
    type: ObjectId,
    ref: 'Expense'
  }],
  googleId: String,
  friends: [{
    person: {
      type: ObjectId,
      ref: 'User'
    },
    friendship: {
      type: ObjectId,
      ref: 'Friend'
    }
  }],
  groups: [{
    type: ObjectId,
    ref: 'Group'
  }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);