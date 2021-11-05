const {
  createRecipesModel,
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

module.exports = {
  createRecipesController,
};