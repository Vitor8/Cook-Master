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
} = require('../controllers/recipesController');

app.use(bodyParser.json());

app.post('/users', isDataValid, createUsersController);

app.post('/login', isLoginValid, loginUsersController);

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InZAZ21haWwuY29tIiwicGFzc3dvcmQiOiIxMjM0NTY3ODkiLCJpYXQiOjE2MzYxNDgxMzMsImV4cCI6MTYzNjE1MTczM30.Nk7bBBDFFEOAPrGsaFaDo59Tfwix4biJTUJQLSyYDcA
app.post('/recipes', isTokenValid, isRecipeDataValid, createRecipesController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
