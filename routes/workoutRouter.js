const express = require('express');
const Workout = require('../models/workout');

const workoutRouter = express.Router();

workoutRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      let workouts = await Workout
        .find({ creator: req.user._id })
        .populate('exercises creator');
      res.json(workouts);
    }
    catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      let workout = await Workout
        .create({
          name: req.body.name,
          exercises: req.body.exercises,
          creator: req.user._id
        });
      workout = await workout
        .populate('exercises creator');
      res.json(workout);
    }
    catch (err) {
      return next(err);
    }
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
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const workout = await Workout
        .findById({ _id: req.params.workoutId })
        .populate('exercises creator');
      res.json(workout);
    }
    catch (err) {
      return next(err);
    }
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST OPERATION FORBIDDEN ON /workouts/${req.params.workoutId}`
    );
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end(
      `PUT OPERATION FORBIDDEN ON /workouts/${req.params.workoutId}`
    );
  })
  .delete(async (req, res, next) => {
    try {
      const workout = await Workout
        .findOneAndDelete({ _id: req.params.workoutId })
      res.json(workout);
    }
    catch (err) {
      return next(err);
    }
  });

module.exports = workoutRouter;