const express = require('express');
const Archive = require('../models/archive');
const authenticate = require('../authenticate');

const archiveRouter = express.Router();

archiveRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('READS ARCHIVE LOGS');
})
.post((req, res) => {
  res.end('ADDS NEW ARCHIVE LOG');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT OPERATION FORBIDDEN ON /archive');
})
.delete((req, res) => {
  res.statusCode = 403;
  res.end('DELETE OPERATION FORBIDDEN ON /archive');
});

module.exports = archiveRouter;