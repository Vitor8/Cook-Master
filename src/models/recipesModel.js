const { ObjectId } = require('mongodb');
const mongoConnection = require('./connection');

const getIdByEmail = async (email) => {
  const usersCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('users'));

  const user = await usersCollection.findOne({ email });

  const { _id: userId } = user;

  return userId;
};

const createRecipesModel = async (name, ingredients, preparation, email) => {
  const userId = await getIdByEmail(email);

  const recipesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));
    
  const newRecipe = {
    name,
    ingredients,
    preparation,
    userId,
  };
    
  const { insertedId: id } = await recipesCollection.insertOne(newRecipe);
  
  return { 
    id,
    userId,
  };
};

const getAllRecipesModel = async () => {
  const recipesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));

  const recipes = await recipesCollection.find().toArray();

  return recipes;
};

const getRecipeByIdModel = async (id) => {
  if (id.length < 24) return false;

  const recipesCollection = await mongoConnection.getConnection()
    .then((db) => db.collection('recipes'));

  const recipe = await recipesCollection.findOne({ _id: ObjectId(id) });

  if (!recipe) return false;

  return recipe;
};

module.exports = {
  createRecipesModel,
  getAllRecipesModel,
  getRecipeByIdModel,
};