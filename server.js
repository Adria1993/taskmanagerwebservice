//Instancia de todos los paquetes necesarios
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var userController = require('./controllers/user');
var taskController = require('./controllers/task');
var passport = require('passport');
var authController = require('./controllers/auth');

//Conexion a la base de datos mongod --dbpath c:\Users\Adrikus\Desktop\database
mongoose.connect('mongodb://localhost:27017/taskmanager');
//Instancia necesaria para la creacion de la aplicacion express
var app = express();
// Use the passport package in our application
app.use(passport.initialize());

app.use(bodyParser.urlencoded({
  extended: true
}));

var port = process.env.port || 3000;

var router = express.Router();

router.get('/', (req, res) => {
  res.json({music: "Feel good inc - Gorillaz"});
});

router.route('/users')
  .post(userController.postUsers)
  .get(authController.isAuthenticated, userController.getUsers);

router.route('/task')
  .get(authController.isAuthenticated, taskController.getTasks)
  .post(authController.isAuthenticated, taskController.postTask);

router.route('/task/:task_id')
  .get(authController.isAuthenticated, taskController.getTask);

app.use('/api', router);

app.listen(port);
console.log("Server running at http://localhost:"+port);
