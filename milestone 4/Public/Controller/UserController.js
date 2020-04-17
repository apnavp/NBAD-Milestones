var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userProfile = require('../model/userprofile');
var session = require('express-session');
var userConnectionsDB=require('../utility/UserConnectionDB.js');
var userDbUtil = require('../utility/UserDB');
var connectionDB = require('../utility/connectionDB');
var UserConnectionObject= require('../model/UserConnection.js');


var urlencodedParser = bodyParser.urlencoded({
  extended: false
});


var sessionAssign=async function(request,response,next)
{

    if(!request.session.theUser)
    {
      var users= await userDbUtil.getUser(request.body.login);
      console.log(users);
      if(users!=null)
      {

        user= users;
        request.session.theUser = user;

         var findout=await userConnectionsDB.getUserProfile(request.body.login);
         var UserConnections=[];
         for (var i = 0; i < findout.length; i++) {

           var connection=await connectionDB.getConnection(findout[i].connectionID)
           console.log("inprofile"+connection.connectionID);
           var addConnection = new UserConnectionObject(connection,findout[i].RSVP);
           console.log(connection,findout[i].RSVP);
           UserConnections.push(addConnection);
           console.log("inside get connections- user db");
           console.log(UserConnections);
         }
        Profile = new userProfile(request.session.theUser.UserID);
        Profile.UserConnections=UserConnections;
        request.session.UserProfile= Profile;
        console.log("this is user profile after assignment");
        console.log(request.session.UserProfile);
    }
      else {
        response.render('index',{session:request.session.theUser});
      }
    }

    next();
}



router.get('/', function(request, response) {
  response.render('login', {
    session: request.session.theUser
  });
});

router.post('/', urlencodedParser,sessionAssign, async function(request, response) {
  response.render('savedConnections', {
    session: request.session.theUser,
    qs: request.session.UserProfile
  });
});

module.exports = router;