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

module.exports = {
  createRecipesModel,
};