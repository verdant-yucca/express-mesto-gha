const Card = require('../models/card');
const {
  ERROR_CODE_BED_REQUEST,
  ERROR_CODE_NOT_FOUND,
  ERROR_CODE_INTERNAL_SERVER,
  ERROR_TEXT_INTERNAL_SERVER,
  ERROR_TEXT_NOT_FOUND_CARDS,
  ERROR_TEXT_BED_REQUEST,
} = require('../utils/constants');

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user._id })
    .then((card) => {
      res.status(200).send({ data: card });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER);
    });
};

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER));
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send(ERROR_TEXT_NOT_FOUND_CARDS);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER);
    });
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },
  )
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send(ERROR_TEXT_NOT_FOUND_CARDS);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      if (err.name === 'CastError') {
        res.status(ERROR_CODE_BED_REQUEST).send(ERROR_TEXT_BED_REQUEST);
        return;
      }
      res.status(ERROR_CODE_INTERNAL_SERVER).send(ERROR_TEXT_INTERNAL_SERVER);
    });
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndRemove(req.params.id)
    .then((card) => {
      if (card) {
        res.status(200).send({ data: card });
      } else {
        res.status(ERROR_CODE_NOT_FOUND).send(ERROR_TEXT_NOT_FOUND_CARDS);
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
