const jwt = require('jsonwebtoken');

exports.sign = async (data) => {
  return await jwt.sign(data, process.env.JWT_SECRET, { expiresIn: data.expireIn || process.env.JWT_EXPIRE_IN });
}

exports.verify = async (token) => {
  return await jwt.verify(token, process.env.JWT_SECRET);
}