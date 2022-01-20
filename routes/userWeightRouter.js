const express = require('express');
const UserWeight = require('../models/userWeight');

const userWeightRouter = express.Router();

userWeightRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const userWeight = await UserWeight
        .find({ creator: req.user._id });
      res.json(userWeight[userWeight.length - 1]);
    }
    catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const userWeight = await UserWeight
        .create({
          weight: req.body.weight,
          systemIsMetric: req.body.systemIsMetric,
          lastMeasured: req.body.lastMeasured,
          creator: req.user._id
        });
      res.json(userWeight);
    }
    catch (err) {
      return next(err);
    }
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