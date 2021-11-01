const express = require('express');
const userWeight = require('../models/userWeight');
const authenticate = require('../authenticate');

const userWeightRouter = express.Router();

userWeightRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('READS USERWEIGHT');
})
.post((req, res) => {
  res.end('ADDS NEW USERWEIGHT');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT OPERATION FORBIDDEN ON /userWeight');
})
.delete((req, res) => {
  res.statusCode = 403;
  res.end('DELETE OPERATION FORBIDDEN ON /userWeight');
});

module.exports = userWeightRouter;