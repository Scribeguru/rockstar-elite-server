const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const selectedDetailsSchema = new Schema({
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  },
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
  userWeight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userWeight'
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  details: [selectedDetailsSchema]
});

module.exports = mongoose.model('Archive', archiveSchema);