const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWeightSchema = new Schema({
  weight: {
    type: Number,
    default: '--'
  },
  systemIsMetric: {
    type: Boolean,
    required: true
  },
  lastMeasured: {
    type: Date,
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('UserWeight', userWeightSchema);