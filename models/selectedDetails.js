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

module.exports = mongoose.model('Exercise', selectedDetailsSchema);