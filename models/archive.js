const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const selectedDetailsSchema = require('./selectedDetails');
const userWeightSchema = require('./userWeight');

const archiveSchema = new Schema({
  selected: {
    type: String,
    required: true,
    details: [selectedDetailsSchema]
  },
  userWeight: [userWeightSchema]
});

module.exports = mongoose.model('Archive', archiveSchema);