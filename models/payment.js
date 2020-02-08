const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const {ObjectId} = Schema.Types;

const paymentSchema = new Schema({
  amount: {
    type: Number,
    required: true
  },
  currency: {
    type: String,
    required: true,
    default: 'INR'
  },
  from: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  to: {
    type: ObjectId,
    ref: 'User',
    required: true
  },
  createdBy: {
    type: ObjectId,
    ref: 'User',
    required: true
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

module.exports = mongoose.model('Payment', paymentSchema);