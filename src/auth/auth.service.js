const localStrategy = require('passport-local').Strategy;
const passport = require('passport');
const bcrypt = require('bcryptjs');
const User = require('../user/user.model');
const moment = require('moment');

module.exports = (passport) => {
  passport.use(
    'user',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true,
      },
      async (req, email, password, done) => {
        try {
          console.log(req.body);
          let data = {};
          const transformedMail = email.toLowerCase();
          const hashedPassword = await bcrypt.hash(password, 10);
          data.email = transformedMail;
          data.password = hashedPassword;
          data.userRole = 'user';
          const code = Math.floor(Math.random() * (999999 - 100000) + 100000);
          data.accountNumber = code;
          console.log(data);
          const user = await User.create(data);

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );

  passport.use(
    'admin',
    new localStrategy(
      {
        usernameField: 'email',
        passwordField: 'password',
      },
      async (email, password, done) => {
        try {
          let data = {};
          const transformedMail = email.toLowerCase();
          const hashedPassword = await bcrypt.hash(password, 10);
          data.email = transformedMail;
          data.password = hashedPassword;
          data.userRole = 'admin';
          const user = await User.create(data);

          return done(null, user);
        } catch (err) {
          done(err);
        }
      }
    )
  );
  passport.use(
    'login',
    new localStrategy(
      { usernameField: 'email', passwordField: 'password' },
      async (email, password, done) => {
        try {
          const transformedMail = email.toLowerCase();
          const user = await User.findOne({ email: transformedMail });
          if (!user) {
            return done(null, false, { message: 'User not found' });
          }
          const validate = await user.isPasswordMatch(password);

          if (!validate) {
            return done(null, false, {
              message: 'Incorrect password inputted...',
            });
          }
          const userData = JSON.parse(JSON.stringify(user));
          return done(null, userData, { message: 'Login Successful' });
        } catch (err) {
          return done(err);
        }
      }
    )
  );
};
