const jwt = require('jsonwebtoken');

const isTokenValid = (req, res, next) => {
  const token = req.headers.authorization;
  const secret = 'quinze';

  if (!token) {
    return res.status(401).json({
      message: 'missing auth token',
    });
  }

  try {
    const payload = jwt.verify(token, secret);

    req.user = payload;

    return next();
  } catch (error) {
    return res.status(401).json({
      message: 'jwt malformed',
    });
  }
};

const isRecipeDataValid = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;

  if (!name || !ingredients || !preparation) {
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

module.exports = { isTokenValid, isRecipeDataValid };