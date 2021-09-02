const express = require('express');
const exerciseRouter = express.Router();

exerciseRouter.route('/')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end('READS ALL EXERCISES');
})
.post((req, res) => {
  res.end('ADDS NEW EXERCISE');
})
.put((req, res) => {
  res.statusCode = 403;
  res.end('PUT OPERATION FORBIDDEN ON /exercises');
})
.delete((req,res) => {
  res.statusCode = 403;
  res.end('DELETE OPERATION FORBIDDEN ON /exercises');
});

exerciseRouter.route('/:exerciseId')
.all((req, res, next) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  next();
})
.get((req, res) => {
  res.end(`READS EXERCISE ON /exercises/${req.params.exerciseId}`);
})
.post((req, res) => {
  res.statusCode = 403;
  res.end(`POST OPERATION FORBIDDEN ON /exercises/${req.params.exerciseId}`);
})
.put((req, res) => {
  res.end(`EDITS EXERCISE ON /exercises/${req.params.exerciseId}`);
})
.delete((req, res) => {
  res.end(`DELETES EXERCISE ON /exercises/${req.params.exerciseId}`);
});

module.exports = exerciseRouter;

