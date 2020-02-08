const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const {ObjectId} = Schema.Types;

const activitySchema = Schema({
  actType: {
    type: String, //expense/payment
    required: true
  },
  operation: {
    type: String, //create/update/delete
    required: true
  },
  refId: {
    type: ObjectId,
    required: true
  },
  concerned: [{
    type: ObjectId,
    ref: 'User'
  }],
  by: {
    type: ObjectId,
    ref: 'User',
    required: true
  }
}, {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);