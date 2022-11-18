const allowedCors = [
  'https://verdant-yucca-front.nomoredomains.icu',
  'http://verdant-yucca-front.nomoredomains.icu',
  'localhost:3000'
];

module.exports.setHeaderOrigin = req, res => {
  const { origin } = req.headers;
  if (allowedCors.includes(origin)) {
    return res.header('Access-Control-Allow-Origin', origin);
  }
}