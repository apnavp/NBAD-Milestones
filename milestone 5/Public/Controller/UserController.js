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
const { check, validationResult, body } = require("express-validator");


var urlencodedParser = bodyParser.urlencoded({
  extended: false
});


router.get('/', function (request, response) {
  response.render('login', {
    pageData: [],
    session: request.session.theUser,
    Success:true
  });
});

router.post('/', urlencodedParser,[
  check("login")
  .not()
  .isEmpty()
  .withMessage("Login id field can't be blank"),
check("password")
  .not()
  .isEmpty()
  .withMessage("Password field can't be blank")
  .isLength(6)
  .withMessage("Minimum 6 characters")
], async function (request, response,next) {
  console.log(request.body.login + "   " + request.body.password);
  const errors=validationResult(request).array();
  let passwordErrors = errors.find(val => {
    return val.param == "password";
  });
  let loginErrors = errors.find(val => {
    return val.param == "login";
  });
  let loginObject = [loginErrors, passwordErrors];
  console.log(loginObject);
  if (errors[0] == undefined && errors[1] == undefined ){
    let users = await userDbUtil.getUser(request.body.login, request.body.password);
    console.log("users are"+ users);
    if(users){
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
        response.render('savedConnections', {
          session: request.session.theUser,
          qs: request.session.UserProfile,
        });
      } else {
        console.log("login or password not correct");
        response.render("login", {
          pageData: loginObject,
          Success:false,
          session: request.session.theUser
        });
      }
}else{
  response.render('login', {
    pageData: loginObject,
    session: request.session.theUser,
    UserID:undefined,
    Success:true
  });
  next();
}
});

module.exports = router;