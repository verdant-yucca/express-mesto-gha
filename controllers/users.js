const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const UnauthorizedError = require('../errors/UnauthorizedError');

const {
  ERROR_TEXT_NOT_FOUND_USERS,
  ERROR_TEXT_BED_REQUEST,
  secretKey,
} = require('../utils/constants');

module.exports.createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;
  if ((!email) || (!password)) {
    throw new BadRequestError(ERROR_TEXT_BED_REQUEST.message);
  }
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({
        name, about, avatar, email, password: hash,
      })
        .then((user) => res.status(200).send({
          user: {
            name: user.name,
            about: user.about,
            avatar: user.avatar,
            email: user.email,
            _id: user.id,
          },
        }))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new BadRequestError(ERROR_TEXT_BED_REQUEST.message));
          }
          if (err.code === 11000) {
            next(new ConflictError('Пользователь с данным email уже существует'));
          }
          next(err);
        });
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(ERROR_TEXT_NOT_FOUND_USERS.message);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        throw new NotFoundError(ERROR_TEXT_BED_REQUEST.message);
      }
      next(err);
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { avatar },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(ERROR_TEXT_NOT_FOUND_USERS.message);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new BadRequestError(ERROR_TEXT_BED_REQUEST.message));
      }
      next(err);
    });
};

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => {
      if (users) {
        res.send(users);
      } else {
        throw new NotFoundError(ERROR_TEXT_NOT_FOUND_USERS.message);
      }
    })
    .catch(next());
};

module.exports.getUser = (req, res, next) => {
  User.findById(req.params.userId)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        throw new NotFoundError(ERROR_TEXT_NOT_FOUND_USERS.message);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(ERROR_TEXT_BED_REQUEST.message));
      }
      next(err);
    });
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if ((!email) || (!password)) {
    throw new BadRequestError(ERROR_TEXT_BED_REQUEST.message);
  }
  return User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: '1d' });
      res.send({ token });
    })
    .catch(() => next(new UnauthorizedError('Неправильная почта или пароль')));
};

module.exports.getMe = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (user) {
        res.status(200).send(user);
      } else {
        throw new NotFoundError(ERROR_TEXT_NOT_FOUND_USERS.message);
      }
    })
    .catch(next());
};
