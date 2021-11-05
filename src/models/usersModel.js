// const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoConnection = require('./connection');

const { JWT_SECRET } = process.env;

const getByEmail = async (email) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  // Se o email não existir, emailNotExists será nulo
  const emailNotExists = await usersCollection
    .findOne({ email });

  if (!emailNotExists) return true;

  return false;
};

const createUserModel = async ({ name, email, password }) => {
  const emailNotExists = await getByEmail(email);

  if (!emailNotExists) return false;

  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const newUser = {
    name,
    email,
    password,
    role: 'user',
  };

  const { insertedId: id } = await usersCollection.insertOne(newUser);

  return {
    id,
  };
};

const loginUserModel = async (email, password) => {
  const payload = {
    email,
    password,
  };

  const token = jwt.sign(payload, JWT_SECRET, {
    expiresIn: '1h',
  });

  return { token };
};

module.exports = {
  createUserModel,
  loginUserModel,
};