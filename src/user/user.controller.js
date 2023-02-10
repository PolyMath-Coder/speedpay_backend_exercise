const catchAsync = require('express-async-handler');
const userService = require('./user.service');

const makeDeposit = catchAsync(async (req, res) => {
  const data = await userService.makeDeposit(req.user._id, req.body.amount);
  res.status(201).json({
    status: 'success',
    message: `Account now successfully credited with #${req.body.amount}`,
  });
});

const makeWithdrawal = catchAsync(async (req, res) => {
  const data = await userService.makeWithdrawal(req.user._id, req.body.amount);
  res.status(201).json({
    status: 'success',
    message: `You have successfully withdrawn #${req.body.amount} from this account...`,
  });
});

const balanceCheck = catchAsync(async (req, res) => {
  const data = await userService.checkBalance(req.user._id);
  res
    .status(201)
    .json({ status: 'success', message: `Your current balance is #${data}.` });
});

const makeTransfer = catchAsync(async (req, res) => {
  const data = await userService.makeTransfer(req.user._id, req.body);
  res
    .status(201)
    .json({
      status: 'success',
      status: `Transfer of #${req.body.amount} successful!`,
    });
});

module.exports = { makeDeposit, makeWithdrawal, balanceCheck, makeTransfer };
