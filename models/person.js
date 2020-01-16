const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const personSchema = new Schema({
  name: {
    type: String,
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
    type: String,
    required: true
  },
  payments: [{
    type: Schema.Types.ObjectId,
    required: true
  }],
  expenses: [{
    type: Schema.Types.ObjectId,
    required: true
  }]
}, {timestamps: true});

module.exports = mongoose.model('Person', personSchema);