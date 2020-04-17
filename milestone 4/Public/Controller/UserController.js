var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userProfile = require('../model/userprofile');
var session = require('express-session');
var userDbUtil = require('../utility/userDB');
var session = require('express-session');
var connectionDB = require('../utility/connectionDB');
var UserConnectionObject = require('../model/UserConnection.js');
var userProfileDB = require('../utility/UserProfileDB.js');

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var sessionAssign = async function (request, response, next) {

  if (!request.session.theUser) {
    var users = await userDbUtil.getUser(request.body.login);

    if (users != null) {

      user = users;
      request.session.theUser = user;

      var findout = await userProfileDB.getUserProfile(request.body.login);
      var UserConnections = [];
      for (var i = 0; i < findout.length; i++) {

        var connection = await connectionDB.getConnection(findout[i].connectionID)
        console.log("inprofile" + connection);
        var addConnection = new UserConnectionObject(connection, findout[i].RSVP);
        UserConnections.push(addConnection);
      }
      Profile = new userProfile(request.session.theUser.UserID);
      Profile.UserConnections = UserConnections;
      request.session.UserProfile = Profile;
    } else {
      response.render('index', {
        session: request.session.theUser
      });
    }
  }
  next();
}

router.get('/', function (request, response) {
  response.render('login', {
    session: request.session.theUser
  });
});

router.post('/', urlencodedParser, sessionAssign, function (request, response) {

  response.render('savedConnections', {
    session: request.session.theUser,
    qs: request.session.UserProfile
  });
});

module.exports = router;