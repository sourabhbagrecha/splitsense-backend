const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  requester: {
    type: Schema.Types.ObjectId,
    required: true
  },
  accepter:{
    type: Schema.Types.ObjectId,
    required: true
  },
  first: {
    type: Schema.Types.ObjectId,
    required: true
  },
  second: {
    type: Schema.Types.ObjectId,
    required: true
  },
  defaultCurrency: {
    type: String,
    required: true
  },
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Friend', friendSchema);