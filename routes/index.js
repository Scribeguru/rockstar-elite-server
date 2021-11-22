var express = require('express');
const authenticate = require('../authenticate');

var router = express.Router();

/* GET home page. */
router.get('/', authenticate.verifyUser, (req, res, next) => {
  res.render('index', { title: 'Express' });
});

module.exports = router;
