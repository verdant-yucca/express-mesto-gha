const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

const { secretKey } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Сессия истекла. Повторите авторизацию.');
  }
  let payload;
  try {
    payload = jwt.verify(authorization.replace('Bearer ', ''), secretKey);
  } catch (err) {
    next(new UnauthorizedError('Сессия истекла. Повторите авторизацию.'));
  }
  req.user = payload;
  next();
};
