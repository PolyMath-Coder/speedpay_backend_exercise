const { Router } = require('express');
const { userAuthentication, adminAuthorization } = require('../helpers/auth');
const {
  makeDeposit,
  makeWithdrawal,
  balanceCheck,
  makeTransfer,
} = require('./user.controller');

const router = Router();

router.post('/make/deposit', makeDeposit);

router.post('/make/withdrawal', makeWithdrawal);

router.get('/balance/check', balanceCheck);

router.post('/make/transfer', makeTransfer);

module.exports = router;
