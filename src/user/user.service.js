const ApiError = require('../helpers/error');

const User = require('./user.model');

const makeDeposit = async (user, amount) => {
  try {
    const amountToDeposit = parseFloat(amount);
    const { accountBalance } = await User.findById(user);
    const newAccountBalance = accountBalance + amountToDeposit;
    return await User.findByIdAndUpdate(
      user,
      { accountBalance: newAccountBalance },
      { new: true }
    );
  } catch (error) {
    throw new ApiError(400, 'Unable to make deposit');
  }
};

const makeWithdrawal = async (user, amount) => {
  const amountToWithdraw = parseFloat(amount);
  const { accountBalance } = await User.findById(user);
  if (accountBalance < amountToWithdraw) {
    throw new ApiError(
      403,
      'Oops! You have insufficient funds to make this withdrawal'
    );
  }
  const newAccountBalance = accountBalance - amountToWithdraw;
  return await User.findById(
    user,
    { accountBalance: newAccountBalance },
    { new: true }
  );
};

const checkBalance = async (_id) => {
  try {
    const { accountBalance } = await User.findOne({ _id });
    return accountBalance;
  } catch (error) {
    throw new ApiError(400, 'Unable to check user account balance');
  }
};

const makeTransfer = async (sender, data) => {
  const receiverAccount = data.accountNumber;
  const amount = data.amount;

  const receiverAccountNumber = parseFloat(receiverAccount);
  const amountToTransfer = parseFloat(amount);

  const isReceiverExist = await User.findOne({
    accountNumber: receiverAccountNumber,
  });

  if (!isReceiverExist) {
    throw new ApiError(400, 'This account is non-existent and thus invalid.');
  }
  const { accountBalance } = await User.findById(sender);
  if (accountBalance < amountToTransfer) {
    throw new ApiError(
      400,
      'You do not have sufficient funds for this transaction...'
    );
  }
  const debitSender = accountBalance - amountToTransfer;
  await User.findByIdAndUpdate(
    sender,
    { accountBalance: debitSender },
    { new: true }
  );
  const receiver = await User.findOne({
    accountNumber: receiverAccountNumber,
  });
  const receiverBalance = receiver.accountBalance;
  const creditReceiver = receiverBalance + amountToTransfer;
  return await User.findOneAndUpdate(
    { accountNumber: receiverAccountNumber },
    { accountBalance: creditReceiver },
    { new: true }
  );
};

module.exports = { makeDeposit, makeWithdrawal, checkBalance, makeTransfer };
