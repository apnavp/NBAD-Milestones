var express = require('express');
var session = require('express-session');
var app = express();
var bodyParser = require('body-parser');
var bodyParser = require('body-parser');
var connections = require('./routes/connections');
var about = require('./routes/about');
var connection = require('./routes/connection');
var index = require('./routes/index');
var contact = require('./routes/contact');
var newConnection = require('./routes/newConnection');
var ProfileController = require('./Controller/ProfileController.js');
var UserController = require('./Controller/UserController.js');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));

app.use(session({
  secret: 'Milestone',
  resave:false,
  saveUninitialized:true
}));
//custom route implementation

app.use('/newConnection', newConnection);
app.use('/connections', connections);
app.use('/connection', connection);
app.use('/savedconnections', ProfileController);
app.use('/about', about);
app.use('/contact', contact);
app.use('/login', UserController);
app.use('/*', index);

app.listen(8084);
console.log("Listenting to port 8084");