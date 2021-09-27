const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const weightSchema = new Schema({
  weight: {
    type: Number,
    default: '--'
  },
  metric: {
    type: String,
    required: true
  },
  lastMeasured: {
    type: Date,
    required: true
  }
});

modules.export = mongoose.model('Weight', weightSchema);