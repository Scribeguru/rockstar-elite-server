const express = require('express');
const Archive = require('../models/archive');

const archiveRouter = express.Router();

archiveRouter.route('/')
  .all((req, res, next) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get(async (req, res, next) => {
    try {
      const archive = await Archive
        .find({ creator: req.user._id })
        .populate('userWeight');
      res.json(archive);
    }
    catch (err) {
      return next(err);
    }
  })
  .post(async (req, res, next) => {
    try {
      let archive = await Archive
        .create({
          userWeight: req.body.userWeight,
          exerciseDetails: req.body.exerciseDetails,
          date: req.body.date,
          comments: req.body.comments,
          creator: req.user._id
        });
      archive = await archive
        .populate('userWeight');
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

archiveRouter.route('/:archiveId')
  .all((req, res, next) => {
    res.statusCode = 403;
    res.setHeader('Content-Type', 'application/json');
    next();
  })
  .get((req, res) => {
    res.end(
      `GET OPERATION FORBIDDEN ON /archive/${req.params.archiveId}`
    );
  })
  .post((req, res) => {
    res.end(
      `POST OPERATION FORBIDDEN ON /archive/${req.params.archiveId}`
    );
  })
  .put((req, res) => {
    res.end(
      `PUT OPERATION FORBIDDEN ON /archive/${req.params.archiveId}`
    );
  })
  .delete(async (req, res, next) => {
    try {
      const archive = await Archive
        .findByIdAndDelete({ _id: req.params.archiveId });
      res.statusCode = 200;
      res.json(archive);
    }
    catch (err) {
      return next(err);
    }
  });

module.exports = archiveRouter;