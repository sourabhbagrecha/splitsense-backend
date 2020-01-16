const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const friendSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  category:{
    type: String,
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