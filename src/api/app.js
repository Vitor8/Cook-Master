const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
  isDataValid,
} = require('../validations/usersValidations');

const {
  createUsersController,
} = require('../controllers/usersController');

app.use(bodyParser.json());

// http POST :3000/users name='Vitor Hugo' email='v@gmail.com' password='123456789'
app.post('/users', isDataValid, createUsersController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
