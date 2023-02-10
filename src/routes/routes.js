const { Router } = require('express');
const { userAuthentication } = require('../helpers/auth');
const router = Router();

router.use('/auth', require('../auth/auth.routes'));

router.use('/user', userAuthentication, require('../user/user.routes'));

module.exports = router;
