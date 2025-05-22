const jwt = require('jsonwebtoken');
const { secret } = require('../config/jwt');

const generateToken = (userId) => {
  return jwt.sign({ id: userId }, secret, { expiresIn: '7d' });
};

module.exports = generateToken;
