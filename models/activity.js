const mongoose = require('mongoose');
const Schema = mongoose.Schema;

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
    type: mongoose.Schema.Types.ObjectId
  }
}, {timestamps: true});

module.exports = mongoose.model('Activity', activitySchema);