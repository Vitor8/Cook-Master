const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
  isDataValid,
  isLoginValid,
} = require('../validations/usersValidations');

const {
  isTokenValid,
  isRecipeDataValid,
} = require('../validations/recipesValidations');

const {
  createUsersController,
  loginUsersController,
} = require('../controllers/usersController');

const {
  createRecipesController,
  getAllRecipesController,
  getRecipeByIdController,
  updateRecipeController,
} = require('../controllers/recipesController');

app.use(bodyParser.json());

app.post('/users', isDataValid, createUsersController);

app.post('/login', isLoginValid, loginUsersController);

app.post('/recipes', isTokenValid, isRecipeDataValid, createRecipesController);

app.get('/recipes', getAllRecipesController);

app.get('/recipes/:id', getRecipeByIdController);

app.put('/recipes/:id', isTokenValid, updateRecipeController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
