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
cardsRouter.put('/cards/:id/likes', cardIdValidate, likeCard);
cardsRouter.delete('/cards/:id/likes', cardIdValidate, dislikeCard);
cardsRouter.delete('/cards/:id', cardIdValidate, deleteCard);

module.exports = cardsRouter;
