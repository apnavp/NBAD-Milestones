var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router();
var session = require('express-session');
var userProfile = require('../model/userprofile');
var connectionDB = require('../utility/connectionDB');

app.use(session({
  secret: 'my express secret'
}));

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

router.get('/logout', function(req, res) {
  Profile.emptyProfile();
  req.session.destroy();
  res.render('index', {
    session: undefined
  });
})

router.all('/*', urlencodedParser, function(req, res) {
  if (!req.session.UserProfile) {
    console.log("no user profile here");
    res.render('login', {
      session: req.session.theUser
    });
  } else {
    if (!req.query.action) {
      res.render('savedConnections', {
        qs: req.session.UserProfile,
        session: req.session.theUser
      });
    } else {
      var action = req.query.action;
      var connectionID = req.query.ID;
      var formValue = req.body.formValue;
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
                req.session.UserProfile = Profile;
                res.render('savedConnections', {
                  qs: req.session.UserProfile,
                  session: req.session.theUser
                });
              } else {
                Profile.UserConnections[i].RSVP = formValue;
                Profile.updateRSVP(Profile.UserConnections[i]);
                req.session.UserProfile = Profile;
                console.log(Profile);
                res.render('savedConnections', {
                  qs: req.session.UserProfile,
                  session: req.session.theUser
                });
              }
            } else {
              res.render('savedConnections', {
                qs: req.session.UserProfile,
                session: req.session.theUser
              });
            }
          }
        }

        console.log(Profile.UserConnections.length);
        if (alreadyExist == 0) {
          var SingleConnection = connectionDB.getConnection(connectionID);
          if (SingleConnection == null) {
            res.render('savedConnections', {
              qs: req.session.UserProfile,
              session: req.session.theUser
            });
            console.log("not there");
          } else {
            console.log("in add");
            console.log(formValue);
            if (formValue == undefined) {
              formValue = 'MAYBE';
              Profile.addConnection(SingleConnection, formValue);
              req.session.UserProfile = Profile;
              res.render('savedConnections', {
                qs: req.session.UserProfile,
                session: req.session.theUser
              });
            } else {
              Profile.addConnection(SingleConnection, formValue);
              req.session.UserProfile = Profile;
              res.render('savedConnections', {
                qs: req.session.UserProfile,
                session: req.session.theUser
              });
            }
          }
        }
      } else if (action == 'delete') {
        var deleteConnection = connectionDB.getConnection(connectionID);
        if (deleteConnection == null) {
          res.render('savedConnections', {
            qs: req.session.UserProfile,
            session: req.session.theUser
          });
          console.log("not there");
        } else {
          console.log("in delete");
          Profile.removeConnection(deleteConnection);
          req.session.UserProfile = Profile;
          for (var i = 0; i <= Profile.UserConnections.length - 1; i++) {
            console.log(Profile.UserConnections[i].Connection.connectionID);
          }
          res.render('savedConnections', {
            qs: req.session.UserProfile,
            session: req.session.theUser
          });
        }
      }
    }
  }
});

module.exports = router;