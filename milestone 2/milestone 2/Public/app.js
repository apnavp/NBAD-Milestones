var express = require('express');
var app = express();
var connections = require('./routes/connections');
var about = require('./routes/about');
var connection = require('./routes/connection');
var savedconnections = require('./routes/savedconnections');
var index = require('./routes/index');
var contact = require('./routes/contact');
var newConnection = require('./routes/newConnection');

app.set('view engine', 'ejs');

//set the path for static resources to be accessible
app.use('/assets', express.static('assets'));

//custom route implementation

app.use('/newConnection', newConnection);
app.use('/connections', connections);
app.use('/connection', connection);
app.use('/savedconnections', savedconnections);
app.use('/*', index);
app.use('/about', about);
app.use('/contact', contact);

app.listen(8084);
console.log("Listenting to port 8084");