const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const workoutSchema = new Schema({
  name: {
    type: Array,
    required: true
  }
});

module.exports = mongoose.model('Workout', workoutSchema);