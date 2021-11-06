const express = require('express');
const bodyParser = require('body-parser');
const multer = require('multer');

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
  deleteRecipeController,
  postImageController,
} = require('../controllers/recipesController');

app.use(bodyParser.json());
// app.use(express.static(__dirname + '/uploads'));

app.post('/users', isDataValid, createUsersController);

app.post('/login', isLoginValid, loginUsersController);

app.post('/recipes', isTokenValid, isRecipeDataValid, createRecipesController);

app.get('/recipes', getAllRecipesController);

app.get('/recipes/:id', getRecipeByIdController);

app.put('/recipes/:id', isTokenValid, updateRecipeController);

app.delete('/recipes/:id', isTokenValid, deleteRecipeController);

const storage = multer.diskStorage({
  destination: (_req, _file, callback) => {
    callback(null, './src/uploads/');
  },
  filename: (req, _file, callback) => {
    callback(null, `${req.params.id}.jpeg`);
  } });

const upload = multer({ storage });

app.put('/recipes/:id/image', upload.single('image'), isTokenValid, postImageController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
