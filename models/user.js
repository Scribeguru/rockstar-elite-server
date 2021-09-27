const mongoose = require('mongoose');
//passport-local-mongoose? (for setting up user data via passport)
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
  }
});

module.exports = mongoose.model('User', userSchema);