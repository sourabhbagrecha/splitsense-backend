const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const expenseSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  image: {
    type: String,
  },
  category: {
    type: String
  },
  currency: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  paidBy: [{
    user: {
      type: ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number
    }
  }],
  splitBy: [{
    user: {
      type: ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number
    }
  }],
  createdBy:{
    type: ObjectId,
    ref: 'User'
  },
  belongsTo: {
    type: ObjectId
  },
  belongsType: {
    type: String
  },
  deleted: {
    type: Boolean,
    default: false
  }
}, {timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);