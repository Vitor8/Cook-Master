// const { ObjectId } = require('mongodb');
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

module.exports = {
  createUserModel,
};