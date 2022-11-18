// require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const bodyParser = require('body-parser');
// const cors = require('./middlewares/cors');
const cors = require('cors');
const centralizedError = require('./middlewares/centralizedError');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes/routes');

const { PORT = 3000 } = process.env;
const app = express();

const corsOptions = {
  origin: 'https://verdant-yucca-front.nomoredomains.icu',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

mongoose.connect('mongodb://127.0.0.1:27017/mestodb'); // localhost || 127.0.0.1
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(cors(corsOptions));

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(centralizedError);

app.listen(PORT, () => console.log(`App listening on port ${PORT}`));
