const { Router } = require('express');
const { userAuthentication, adminAuthorization } = require('../helpers/auth');
const router = Router();

router.use('/auth', require('../auth/auth.routes'));

router.use('/user', userAuthentication, require('../user/user.routes'));

router.use(
  '/admin',
  userAuthentication,
  adminAuthorization,
  require('../admin/admin.routes')
);

module.exports = router;
