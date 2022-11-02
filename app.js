const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ERROR_CODE_NOT_FOUND,

} = require('./utils/constants');
const { PORT = 3000 } = process.env;

const app = express();
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  req.user = { _id: '63611d4683e112403764b6b4' };
  next();
});

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));
app.use('/*', (req, res) => res.status(ERROR_CODE_NOT_FOUND).send({ message: 'Страница не существует' }) );

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
