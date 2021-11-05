const express = require('express');
const bodyParser = require('body-parser');

const app = express();

const {
  isDataValid,
  isLoginValid,
} = require('../validations/usersValidations');

const {
  createUsersController,
  loginUsersController,
} = require('../controllers/usersController');

app.use(bodyParser.json());

// http POST :3000/users name='Vitor Hugo' email='v@gmail.com' password='123456789'
app.post('/users', isDataValid, createUsersController);

// http POST :3000/login password='123456789'
// http POST :3000/login email='v@gmail.com'
// http POST :3000/login email='erickjaquin@3.com' password='123456789'
// http POST :3000/login email='erickjaquin@gmail.com' password='123456'
// http POST :3000/login email='root@email.com' password='admin123456'
app.post('/login', isLoginValid, loginUsersController);

// Não remover esse end-point, ele é necessário para o avaliador
app.get('/', (request, response) => {
  response.send();
});
// Não remover esse end-point, ele é necessário para o avaliador

module.exports = app;
