const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
  type: {
    type: String
  },
  amount: {
    type: String,
    required: true
  },
  paidBy: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  },
  recievedBy: {
    type: Schema.Types.ObjectId,
    ref: 'Person',
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Payment', paymentSchema);