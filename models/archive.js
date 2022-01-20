const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archiveSchema = new Schema({
  userWeight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'UserWeight'
  },
  exerciseDetails: {},
  date: {
    type: Date,
    required: true
  },
  comments: {
    type: String
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Archive', archiveSchema);