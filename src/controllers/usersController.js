const {
  createUserModel,
  loginUserModel,
} = require('../models/usersModel');

const createUsersController = async (req, res) => {
  const { name, email, password } = req.body;

  const user = await createUserModel({ name, email, password });

  if (!user) {
    return res.status(409).json({
      message: 'Email already registered',
    });
  }

  const { id } = user;

  res.status(201).json({
    user: {
      name,
      email,
      role: 'user',
      _id: id,
    },
  });
};

const loginUsersController = async (req, res) => {
  const { email, password } = req.body;

  const { token } = await loginUserModel(email, password);

  return res.status(200).json({
    token,
  });
};

module.exports = {
  createUsersController,
  loginUsersController,
};