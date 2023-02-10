const User = require('../user/user.model');

const getUsers = async () => {
  return await User.find({ userRole: 'user' }).sort({ _id: -1 });
};

module.exports = { getUsers };
