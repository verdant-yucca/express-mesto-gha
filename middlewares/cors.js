const allowedCors = [
  'https://verdant-yucca-front.nomoredomains.icu/',
  'http://verdant-yucca-front.nomoredomains.icu/',
  'localhost:3000'
];

const cors = (req, res, next) => {
  console.log('сюда попал');
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = 'GET,HEAD,PUT,PATCH,POST,DELETE';
  const requestHeaders = req.headers['access-control-request-headers'];

  if (allowedCors.includes(origin)) {
    console.log('сюда попал1');

    res.header('Access-Control-Allow-Origin', origin);
    res.header('Access-Control-Allow-Credentials', true);
  }
  if (method === 'OPTIONS') {
    console.log('сюда попал2');

    res.header('Access-Control-Allow-Methods', DEFAULT_ALLOWED_METHODS);
    res.header('Access-Control-Allow-Headers', requestHeaders);
    res.end();
  }
  return next()
}

module.exports = cors;