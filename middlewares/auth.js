const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Сессия истекла. Повторите авторизацию.'); // TODO
  }
  let payload;
  try {
    payload = jwt.verify(authorization.replace('Bearer ', ''), 'some-secret-key'); // TODO SHA
  } catch (err) {
    next(new UnauthorizedError('Сессия истекла. Повторите авторизацию.')); // TODO
  }
  req.user = payload;
  next();
};
