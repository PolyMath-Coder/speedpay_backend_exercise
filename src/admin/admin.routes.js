const { Router } = require('express');
const { getAllUsers } = require('./admin.controller');

const router = Router();

router.get('/all/users', getAllUsers);

module.exports = router;
