const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const archiveSchema = new Schema({
  log: {
    type: Mixed
  }
});

module.exports = mongoose.model('Archive', archiveSchema);