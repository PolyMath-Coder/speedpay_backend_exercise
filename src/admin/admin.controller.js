const catchAsync = require('express-async-handler');
const adminService = require('./admin.service');

const getAllUsers = catchAsync(async (req, res) => {
  const data = await adminService.getUsers();
  res.status(200).json({
    status: 'success',
    message: 'All user information and account details now retrieved...',
    data,
  });
});

module.exports = { getAllUsers };
