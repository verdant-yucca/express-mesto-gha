const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
const usersRouter = require('./routes/users');
const cardsRouter = require('./routes/cards');
const { login, createUser } = require('./controllers/users');
const auth = require('./middlewares/auth');
const NotFoundError = require('./errors/NotFoundError');
const centralizedError = require('./middlewares/centralizedError');
const allowedCors = [
  'https://verdant-yucca-front.nomoredomains.icu',
  'http://verdant-yucca-front.nomoredomains.icu',
  'localhost:3000'
];
const { createUserValidation, loginValidation } = require('./middlewares/validatons');

const { PORT = 3000 } = process.env;
const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/mestodb'); // localhost || 127.0.0.1
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  return next()
})

app.post('/signin', loginValidation, login);
app.post('/signup', createUserValidation, createUser);

app.use(auth);
app.use(cardsRouter);
app.use(usersRouter);
app.use('/*', () => {
  throw new NotFoundError('Страница по указанному маршруту не найдена');
});

app.use(errors());
app.use(centralizedError);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
