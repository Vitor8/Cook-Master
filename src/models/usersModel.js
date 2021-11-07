// const { ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const mongoConnection = require('./connection');

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
  const secret = 'quinze';

  const payload = {
    email,
    password,
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: '1h',
  });

  return { token };
};

const createAdminModel = async ({ emailCurrentAdmin, name, emailNewAdmin, password }) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const currentUser = await usersCollection.findOne({ email: emailCurrentAdmin });

  if (currentUser.role !== 'admin') return false;

  const newAdmin = {
    name,
    email: emailNewAdmin,
    password,
    role: 'admin',
  };

  const { insertedId: id } = await usersCollection.insertOne(newAdmin);

  return {
    id,
  };
};

module.exports = {
  createUserModel,
  loginUserModel,
  createAdminModel,
};