const express = require('express');
const Workout = require('../models/workout');
const authenticate = require('../authenticate');

const workoutRouter = express.Router();

workoutRouter.route('/')
  .all(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get((req, res) => {
    res.end('READS ALL WORKOUTS');
  })
  .post((req, res) => {
    res.end('ADDS NEW WORKOUT');
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT OPERATION FORBIDDEN ON /workouts');
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE OPERATION FORBIDDEN ON /workouts');
  });

workoutRouter.route('/:workoutId')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    next();
  })
  .get((req, res) => {
    res.end(`READS WORKOUT ON /workouts/${req.params.workoutId}`);
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST OPERATION FORBIDDEN ON /workouts/${req.params.workoutId}`);
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(`PUT OPERATION FORBIDDEN ON /workouts/${req.params.workoutId}`);
  })
  .delete((req, res) => {
    res.end(`DELETES WORKOUT ON /workouts/${req.params.workoutId}`);
  });

module.exports = workoutRouter;