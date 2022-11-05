const User = require('../models/user');
const {
  ERROR_CODE_BED_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL_SERVER,
  ERROR_TEXT_INTERNAL_SERVER,
  ERROR_TEXT_NOT_FOUND_USERS,
  ERROR_TEXT_BED_REQUEST,
} = require('../utils/constants');

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER);
    });
};

module.exports.updateUser = (req, res) => {
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
        res.status(ERROR_CODE_NOT_FOUND).send(ERROR_TEXT_NOT_FOUND_USERS);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER);
    });
};

module.exports.updateAvatar = (req, res) => {
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
        res.status(ERROR_CODE_NOT_FOUND).send(ERROR_TEXT_NOT_FOUND_USERS);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER);
    });
};

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(() => res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send(ERROR_TEXT_NOT_FOUND_USERS);
      }
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER);
    });
};
