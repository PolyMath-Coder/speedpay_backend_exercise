const { Router } = require('express');
const passport = require('passport');
const { registerUser, registerAdmin, login } = require('./auth.controller');
const { checkEmail } = require('../helpers/checkEmail');
const { authValidator, signUpValidator } = require('../helpers/validator');
const router = Router();

router.post(
  '/user/register',
  signUpValidator,
  checkEmail,
  passport.authenticate('user', { session: false }),
  registerUser
);

router.post(
  '/admin/register',
  authValidator,
  checkEmail,

  passport.authenticate('admin', { session: false }),
  registerAdmin
);

router.post('/login', authValidator, login);

module.exports = router;
