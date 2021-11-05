const isDataValid = (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password || !email.includes('@')) { 
    return res.status(400).json({
      message: 'Invalid entries. Try again.',
    });
  }

  next();
};

const validEmail = (email) => {
  if (email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z.-]+\.[A-Z]{2,}$/igm)) return true;
  return false;
};

const isLoginValid = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) { 
    return res.status(401).json({
      message: 'All fields must be filled',
    });
  }

  if (!validEmail(email) || password.length < 8) {
    return res.status(401).json({
      message: 'Incorrect username or password',
    });
  }

  next();
};

module.exports = { isDataValid, isLoginValid };