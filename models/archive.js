const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectedDetailsSchema = new Schema({
  length: {
    type: String
  },
  sets: {
    type: String
  },
  reps: {
    type: String
  },
  weight: {
    type: String
  }
});

const archiveSchema = new Schema({
  selected: {
    type: String,
    required: true,
    details: [selectedDetailsSchema]
  },
  userWeight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userWeight'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Archive', archiveSchema);