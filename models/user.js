const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
  username: {
    type: String,
    default: '',
    unique: true
  },
  admin: {
    type: Boolean,
    default: false
  },
  exercises: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise'
  },
  workouts: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Workout'
  },
  weight: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'userWeight'
  },
  archives: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Archive'
  }
});

userSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model('User', userSchema);