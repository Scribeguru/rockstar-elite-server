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
    ref: 'UserWeight'
  },
  details: [selectedDetailsSchema],
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