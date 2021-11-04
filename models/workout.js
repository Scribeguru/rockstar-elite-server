const mongoose = require('mongoose');
const exerciseSchema = require('./exercise');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  exercises: {
    type: [exerciseSchema],
    required: true
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Workout', workoutSchema);