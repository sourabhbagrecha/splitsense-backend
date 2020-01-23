const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }],
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  googleId: String,
  friends: [{
    person: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    friendship: {
      type: Schema.Types.ObjectId,
      ref: 'Friend'
    }
  }],
  groups: [{
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }]
}, {timestamps: true});

module.exports = mongoose.model('User', userSchema);