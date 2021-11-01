const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userWeightSchema = new Schema({
  weight: {
    type: Number,
    default: '--'
  },
  system: {
    type: String,
    required: true
  },
  lastMeasured: {
    type: Date,
    required: true
  }
});

module.exports = mongoose.model('userWeight', userWeightSchema);