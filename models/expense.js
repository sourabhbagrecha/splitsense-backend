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
    type: String
  },
  description: {
    type: String
  },
  paidBy: [{
    person: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    },
    amount: {
      type: Number
    }
  }],
  splitBy: [{
    person: {
      type: Schema.Types.ObjectId,
      ref: 'Person'
    },
    amount: {
      type: Number
    }
  }],
  createdBy:{
    type: Schema.Types.ObjectId,
    ref: 'Person'
  },
  belongsTo: {
    type: Schema.Types.ObjectId,
    ref: 'Group'
  }
}, {timestamps: true});

module.exports = mongoose.model('Expense', expenseSchema);