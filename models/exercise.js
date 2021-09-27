const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const exerciseSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  strengthOrCardio: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Exercise', exerciseSchema);