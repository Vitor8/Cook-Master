const jwt = require('jsonwebtoken');

const {
  createUserModel,
  loginUserModel,
  createAdminModel,
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

const createAdminController = async (req, res) => {
  const token = req.headers.authorization; const secret = 'quinze';
  const payload = jwt.verify(token, secret); const { email: emailCurrentAdmin } = payload;
  const { name, email: emailNewAdmin, password } = req.body;
  const admin = await createAdminModel({ emailCurrentAdmin, name, emailNewAdmin, password });

  if (!admin) {
    return res.status(403).json({
      message: 'Only admins can register new admins',
    });
  }

  const { id } = admin;

  return res.status(201).json({
    user: {
      name,
      email: emailNewAdmin,
      role: 'admin',
      _id: id,
    },
  });
};

module.exports = {
  createUsersController,
  loginUsersController,
  createAdminController,
};