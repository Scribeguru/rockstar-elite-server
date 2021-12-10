const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('./models/user');

//local strat (uses passport-local-mongoose)

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.verifyAdmin = (req, res, next) => {
  if (!req.user.admin) {
    const err = new Error('You are not authorized to perform this operation.');
    err.status = 403;
    return next(err);
  } else {
    return next();
  }
};
