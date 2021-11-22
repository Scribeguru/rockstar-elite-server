const express = require('express');
const Exercise = require('../models/exercise');
const authenticate = require('../authenticate');

const exerciseRouter = express.Router();

exerciseRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const exercises = await Exercise.find({ creator: req.user._id });
      res.json(exercises);
    }
    catch {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const exercise = await new Exercise({
        name: req.body.name,
        strengthOrCardio: req.body.strengthOrCardio,
        creator: req.user._id
      });
      res.json(exercise);
    }
    catch {
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
    try {
      const exercise = await Exercise.findById(req.params.exerciseId);
      res.json(exercise);
    }
    catch {
      return next(err);
    }
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(`POST OPERATION FORBIDDEN ON /exercises/${req.params.exerciseId}`);
  })
  .put(async (req, res, next) => {
    try {
      const exercise = await Exercise.findByIdAndUpdate(
        { _id: req.params.exerciseId },
        { name: req.body.newName },
        { new: true }
      );
      res.json(exercise);
    }
    catch {
      return next(err);
    }
  })
  .delete(async (req, res, next) => {
    try {
      const exercise = await Exercise.findByIdAndDelete(req.params.campsiteId);
      res.json(exercise);
    }
    catch {
      return next(err);
    }
  });

module.exports = exerciseRouter;

