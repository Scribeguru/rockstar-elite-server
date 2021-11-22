const express = require('express');
const User = require('../models/user');
const passport = require('passport');
const authenticate = require('../authenticate');

const router = express.Router();

/* GET & DELETE users listing. */
//admin only
router.get('/', async (req, res, next) => {
  try {
    await User.find()
      .then(users => {
        res.json(users);
      });
  }
  catch {
    return next(err);
  }
})
  .delete('/', async (req, res, next) => {
    try {
      await User.deleteMany()
      .then(deleted => {
        res.json(deleted);
      });
    }
    catch {
      return next(err);
    }
  });

router.post('/register', (req, res) => {
  User.register(
    new User({ username: req.body.username }),
    req.body.password,
    (err, user) => {
      if (err) {
        res.statusCode = 500;
        res.setHeader('Content-Type', 'application/json');
        res.json({ err });
      } else {
        user.save(err => {
          if (err) {
            res.statusCode = 500;
            res.setHeader('Content-Type', 'application/json');
            res.json({ err });
            return;
          }
          passport.authenticate('local')(req, res, () => {
            res.statusCode = 200;
            res.setHeader('Content-Type', 'application/json');
            res.json({ success: true, status: 'Registration Successful.' });
          });
        });
      }
    }
  )
});

router.post('/login', passport.authenticate('local'), (req, res) => {
  const token = authenticate.getToken({ _id: req.user._id });
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.json({ success: true, token, status: 'You are logged in.' });
});

router.get('/logout', (req, res, next) => {
  res.clearCookie('session-id');
  res.redirect('/');
});

module.exports = router;
