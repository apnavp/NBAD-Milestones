var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var userDbUtil = require('../utility/userDB');
var session = require('express-session');
var userProfile = require('../model/userprofile');
var connectionDB = require('../utility/connectionDB');
var UserConnectionObject= require('../model/UserConnection.js');
var userConnectionsDB=require('../utility/UserConnectionDB.js')

app.use(session({
  secret: 'my express secret',
  resave:false,
  saveUninitialized:true
}));

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var sessionAssign=async function(request,response,next)
{

    if(!request.session.theUser)
    {
      var users= await userDbUtil.getUser('Jason');

      if(users!=null)
      {

        user= users;
        request.session.theUser = user;

         var findout=await userConnectionsDB.getUserProfile(user.UserID);
         var UserConnections=[];
         for (var i = 0; i < findout.length; i++) {

           var connection=await connectionDB.getConnection(findout[i].connectionID)
           console.log("inprofile"+connection);
           var addConnection = new UserConnectionObject(connection,findout[i].RSVP);
           UserConnections.push(addConnection);
         }
        Profile = new userProfile( request.session.theUser.UserID);
        Profile.UserConnections=UserConnections;
        request.session.UserProfile= Profile;

    }
      else {
        response.render('index',{session:request.session.theUser});
      }
    }

    next();
}



router.get('/logout', function(request, response) {
  request.session.destroy();
  response.render('index', {
    session: undefined
  });
})

router.all('/*', urlencodedParser,sessionAssign,async function(request, response) {
  if (!request.session.UserProfile) {
    console.log("no user profile here");
    response.render('login', {
      session: request.session.theUser
    });
  } else {
    if (!request.query.action) {
      response.render('savedConnections', {
        qs: request.session.UserProfile,
        session: request.session.theUser
      });
    } else {
      var action = request.query.action;
      var connectionID = request.query.ID;
      var formValue = request.body.formValue;
      console.log(formValue + ' formvalue');
      var alreadyExist = 0;
      var deleteExist = 0;
      if (action == 'save') {
        for (var i = 0; i <= Profile.UserConnections.length - 1; i++) {
          if (Profile.UserConnections[i].Connection.connectionID == connectionID) {
            var alreadyExist = 1;
            console.log("Connection is already present");
            if (Profile.UserConnections[i].RSVP != formValue) {
              if (formValue == undefined) {
                Profile.UserConnections[i].RSVP = 'MAYBE';
                Profile.updateRSVP(Profile.UserConnections[i]);
                request.session.UserProfile = Profile;
                response.render('savedConnections', {
                  qs: request.session.UserProfile,
                  session: request.session.theUser
                });
              } else {
                Profile.UserConnections[i].RSVP = formValue;
                Profile.updateRSVP(Profile.UserConnections[i]);
                request.session.UserProfile = Profile;
                console.log(Profile);
                response.render('savedConnections', {
                  qs: request.session.UserProfile,
                  session: request.session.theUser
                });
              }
            } else {
              response.render('savedConnections', {
                qs: request.session.UserProfile,
                session: request.session.theUser
              });
            }
          }
        }

        console.log(Profile.UserConnections.length);
        if (alreadyExist == 0) {
          var SingleConnection = await connectionDB.getConnection(connectionID);
          if (SingleConnection == null) {
            response.render('savedConnections', {
              qs: request.session.UserProfile,
              session: request.session.theUser
            });
            console.log("not there");
          } else {
            console.log("in add");
            console.log(formValue);
            if (formValue == undefined) {
              formValue = 'MAYBE';
              Profile.addConnection(SingleConnection, formValue);
              request.session.UserProfile = Profile;
              response.render('savedConnections', {
                qs: request.session.UserProfile,
                session: request.session.theUser
              });
            } else {
              Profile.addConnection(SingleConnection, formValue);
              request.session.UserProfile = Profile;
              response.render('savedConnections', {
                qs: request.session.UserProfile,
                session: request.session.theUser
              });
            }
          }
        }
      } else if (action == 'delete') {
        var deleteConnection = await connectionDB.getConnection(connectionID);
        if (deleteConnection == null) {
          response.render('savedConnections', {
            qs: request.session.UserProfile,
            session: request.session.theUser
          });
          console.log("not there");
        } else {
          console.log("in delete");
          Profile.removeConnection(deleteConnection);
          request.session.UserProfile = Profile;
          for (var i = 0; i <= Profile.UserConnections.length - 1; i++) {
            console.log(Profile.UserConnections[i].Connection.connectionID);
          }
          response.render('savedConnections', {
            qs: request.session.UserProfile,
            session: request.session.theUser
          });
        }
      }
    }
  }
});

module.exports = router;