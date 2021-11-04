const mongoose = require('mongoose');
const selectedDetailsSchema = require('./selectedDetails');
const userWeightSchema = require('./userWeight');
const Schema = mongoose.Schema;

const archiveSchema = new Schema({
  selected: {
    type: String,
    required: true,
    details: [selectedDetailsSchema]
  },
  userWeight: [userWeightSchema],
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Archive', archiveSchema);