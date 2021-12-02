const express = require('express');
const Archive = require('../models/archive');
const authenticate = require('../authenticate');

const archiveRouter = express.Router();

archiveRouter.route('/')
  .all(authenticate.verifyUser, (req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const archive = await Archive
        .find({ creator: req.user._id });
      res.json(archive);
    }
    catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      const archive = await Archive
        .create({
          userWeight: req.body.userWeight,
          details: req.body.details,
          date: req.body.date,
          comments: req.body.comments,
          creator: req.user._id
        });
      res.json(archive);
    }
    catch (err) {
      return next(err);
    }
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