const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category:{
    type: String,
    required: true
  },
  currency: {
    type: String,
    required: true
  },
  members: [{
    type: Schema.Types.ObjectId,
    ref: 'User'
  }],
  expenses: [{
    type: Schema.Types.ObjectId,
    ref: 'Expense'
  }],
  payments: [{
    type: Schema.Types.ObjectId,
    ref: 'Payment'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Group', groupSchema);