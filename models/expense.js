const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number
    }
  }],
  splitBy: [{
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    },
    amount: {
      type: Number
    }
  }],
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  belongsTo: {
    type: Schema.Types.ObjectId
  }
}, {timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);