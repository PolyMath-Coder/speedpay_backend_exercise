const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config/keys');
const User = require('../user/user.model');
const userAuthentication = (req, res, next) => {
  const bearerHeader = req.headers.authorization;
  if (!bearerHeader) {
    res.status(403).json({
      status: 'access denied',
      msg:
        "Oops! Something sure went wrong... You're likely not authenticated!",
    });
    return;
  }
  const bearer = bearerHeader.split(' ');
  const [tops, token] = bearer;
  jwt.verify(token, JWT_SECRET, (err, decodedToken) => {
    if (err) {
      res.status(401).json({
        status: 'access denied',
        msg: 'Oops! Your token might be expired...',
      });
      return;
    } else {
      req.user = decodedToken.user;
      return next();
    }
  });
  // req.token = bearer;
  // console.log(bearer[1]);
};

const adminAuthorization = (req, res, next) => {
  if (!req.user || req.user.userRole !== 'admin') {
    res.status(403).json({
      status: 'access denied',
      message:
        'Oops! Only admins are permitted to view this resource or perform this action...',
    });
    return;
  }
  next();
};

module.exports = { userAuthentication, adminAuthorization };
