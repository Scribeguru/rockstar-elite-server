const express = require('express');
const Exercise = require('../models/exercise');
const authenticate = require('../authenticate');

const exerciseRouter = express.Router();

exerciseRouter.route('/')
  .all(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const exercises = await Exercise
        .find({ creator: req.user._id });
      res.json(exercises);
    }
    catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const exercise = await Exercise
        .create({
          name: req.body.name,
          strengthOrCardio: req.body.strengthOrCardio,
          creator: req.user._id
        });
      res.json(exercise);
    }
    catch (err) {
      return next(err);
    }
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end('PUT OPERATION FORBIDDEN ON /exercises');
  })
  .delete((req, res) => {
    res.statusCode = 403;
    res.end('DELETE OPERATION FORBIDDEN ON /exercises');
  });

exerciseRouter.route('/:exerciseId')
  .all(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    res.statusCode = 403;
    res.end(
      `GET OPERATION FORBIDDEN ON /exercises/${req.params.exerciseId}`
    );
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST OPERATION FORBIDDEN ON /exercises/${req.params.exerciseId}`
    );
  })
  .put(async (req, res, next) => {
    res.statusCode = 403;
    res.end(
      `PUT OPERATION FORBIDDEN ON /exercises/${req.params.exerciseId}`
    );
  })
  .delete(async (req, res, next) => {
    try {
      const exercise = await Exercise
        .findByIdAndDelete({ _id: req.params.exerciseId });
      res.json(exercise);
    }
    catch (err) {
      return next(err);
    }
  });

module.exports = exerciseRouter;

