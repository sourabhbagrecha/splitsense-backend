const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const groupSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  groupType:{
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
  activities: [{
    type: Schema.Types.ObjectId,
    ref: 'Activity'
  }]
}, {timestamps: true});

module.exports = mongoose.model('Group', groupSchema);