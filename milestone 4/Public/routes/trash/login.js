var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userProfile = require('../model/userprofile');
var session = require('express-session');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get('/', function(request, response) {
  response.render('login', {
    session: request.session.theUser
  });
});

router.post('/', urlencodedParser, function(request, response) {
  console.log("inside login post");
  console.log("this is request body in login"+request.body);
  var user = require('../model/User');

  users = new user(request.body, null, null, null, null, null, null, null, null, null);
  console.log(users);
  user.UserID = request.body.login;
  request.session.theUser = users;

  Profile = new userProfile(request.session.theUser.UserID);
  request.session.UserProfile = Profile;
  console.log("data:", request.session.UserProfile);
  response.render('savedConnections', {
    session: request.session.theUser,
    qs: request.session.UserProfile
  });
});

module.exports = router;