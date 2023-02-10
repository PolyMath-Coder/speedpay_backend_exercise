const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { getEnumsArray, USER_ROLE } = require('../helpers/enums');

const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    trim: true,
  },
  password: {
    type: String,
    trim: true,
  },
  userRole: {
    type: String,
    enum: [...getEnumsArray(USER_ROLE)],
    required: true,
  },
  accountNumber: {
    type: Number,
    trim: true,
  },
  accountBalance: {
    type: Number,
    default: 0.0,
  },
});
userSchema.methods.isPasswordMatch = async function(password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
