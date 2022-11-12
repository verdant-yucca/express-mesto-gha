const cardsRouter = require('express').Router();
const { createCardValidation, cardIdValidate } = require('../middlewares/validatons');

const {
  createCard,
  getCards,
  likeCard,
  dislikeCard,
  deleteCard,
} = require('../controllers/cards');

cardsRouter.post('/cards', createCardValidation, createCard);
cardsRouter.get('/cards', getCards);
cardsRouter.put('/cards/:cardId/likes', cardIdValidate, likeCard);
cardsRouter.delete('/cards/:cardId/likes', cardIdValidate, dislikeCard);
cardsRouter.delete('/cards/:cardId', cardIdValidate, deleteCard);

module.exports = cardsRouter;
