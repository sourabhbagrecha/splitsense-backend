const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const friendSchema = new Schema({
  requester: {
    type: ObjectId,
    ref: "User",
    required: true
  },
  accepter:{
    type: ObjectId,
    ref: "User",
    required: true
  },
  defaultCurrency: {
    type: String,
    required: true
  },
  activities: [{
    type: ObjectId,
    ref: 'Activity'
  }],
  balances: [{
    user: {
      type: ObjectId,
      ref: 'User'
    },
    balance: Number
  }],
  transfer: {
    from: {
      type: ObjectId,
      ref: 'User'
    },
    to: {
      type: ObjectId,
      ref: 'User'
    },
    balance: Number
  },
  groups: [{
    type: ObjectId,
    ref: 'Group'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Friend', friendSchema);