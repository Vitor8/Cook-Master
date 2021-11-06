const {
  createRecipesModel,
  getAllRecipesModel,
  getRecipeByIdModel,
} = require('../models/recipesModel');

const createRecipesController = async (req, res) => {
  const { email } = req.user;
  const { name, ingredients, preparation } = req.body;

  const { id, userId } = await createRecipesModel(name, ingredients, preparation, email);

  return res.status(201).json({
    recipe: {
      _id: id,
      name,
      ingredients,
      preparation,
      userId,
    },
  });
};

const getAllRecipesController = async (_req, res) => {
  const recipes = await getAllRecipesModel();

  return res.status(200).json(recipes);
};

const getRecipeByIdController = async (req, res) => {
  const { id } = req.params;

  const recipe = await getRecipeByIdModel(id);

  if (!recipe) {
    return res.status(404).json({
      message: 'recipe not found',
    });
  }

  return res.status(200).json(recipe);
};

module.exports = {
  createRecipesController,
  getAllRecipesController,
  getRecipeByIdController,
};