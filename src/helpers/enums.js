const getEnumsArray = (object) => {
  return [...Object.values(object)];
};

const USER_ROLE = Object.freeze({
  USER: 'user',
  ADMIN: 'admin',
});

module.exports = { getEnumsArray, USER_ROLE };
