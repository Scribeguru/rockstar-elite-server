const express = require('express');
const weightRouter = express.Router();

weightRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('READS WEIGHT');
})
.post((req, res) => {
  res.end('ADDS NEW WEIGHT');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT OPERATION FORBIDDEN ON /weight');
})
.delete((req, res) => {
  res.statusCode = 403;
  res.end('DELETE OPERATION FORBIDDEN ON /weight');
});

module.exports = weightRouter;