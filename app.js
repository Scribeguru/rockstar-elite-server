const createError = require('http-errors');
const express = require('express');
const path = require('path');
const logger = require('morgan');
const passport = require('passport');
const config = require('./config');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const exerciseRouter = require('./routes/exerciseRouter');
const workoutRouter = require('./routes/workoutRouter');
const userWeightRouter = require('./routes/userWeightRouter');
const archiveRouter = require('./routes/archiveRouter');

const mongoose = require('mongoose');

const url = config.mongoUrl;
const connect = mongoose.connect(url);

connect.then(() => console.log('Connected correctly to mongoDB.'), err => console.log(err));

const app = express();

app.disable('x-powered-by');

//secure traffic only
app.all('*', (req, res, next) => {
  if (req.secure) {
    return next();
  } else {
    console.log(`Redirecting to: https://${req.hostname}:${app.get('secPort')}${req.url}`);
    res.redirect(301, `https://${req.hostname}:${app.get('secPort')}${req.url}`);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(
  cors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: ['GET', 'POST', 'DELETE']
  })
);

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  name: 'session-id',
  secret: config.secretKey,
  saveUninitialized: false,
  resave: false,
  store: new MongoStore({
    mongooseConnection: mongoose.connection,
    collection: 'session',
    ttl: 1000 * 60 * 60 * 2 / 1000
  }),
  cookie: {
    maxAge: 1000 * 60 * 60 * 2,
    sameSite: "None",
    secure: "true"
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/exercises', exerciseRouter);
app.use('/workouts', workoutRouter);
app.use('/userWeight', userWeightRouter);
app.use('/archive', archiveRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
