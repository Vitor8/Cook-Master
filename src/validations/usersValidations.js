const isDataValid = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !email.includes('@')) { 
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

module.exports = { isDataValid };