const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  groupType:{
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  members: [{
    type: ObjectId,
    ref: 'User'
  }],
  activities: [{
    type: ObjectId,
    ref: 'Activity'
  }],
  createdBy: {
    type: ObjectId,
    ref: 'User'
  },
  balances: [{
    user: {
      type: ObjectId,
      ref: 'User'
    },
    balance: Number
  }],
  transfers: [{
    from: {
      type: ObjectId,
      ref: 'User'
    },
    to: {
      type: ObjectId,
      ref: 'User'
    },
    balance: Number
  }]
}, {timestamps: true});

module.exports = mongoose.model('Group', groupSchema);