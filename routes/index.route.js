const express = require('express');
const router = express.Router();
const userRouter = require('./users.route');
const passport = require('passport');
const loginController = require('../controllers/login.controller');
const loginValidator = require('../middleware/validators/login.validator');
const { roles } = require('../config/constants');
const { permit } = require('../middleware/role.middleware');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.post('/login', loginValidator, loginController.login)
router.use('/users', [
  passport.authenticate('jwt', { session: false }), 
  permit([roles.ADMIN])
], userRouter);

module.exports = router;
