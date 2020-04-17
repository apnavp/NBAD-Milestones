var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
var utility = require('../utility/connectionDB.js');
var userDbUtil = require('../utility/userDB');
var userProfile = require('../model/userprofile');
var userConnectionsDB=require('../utility/UserConnectionDB.js')
var urlencodedParser = bodyParser.urlencoded({extended :false});


router.all('/',urlencodedParser,function(request,response){
  if(request.session.theUser)
  {
    console.log("in new info jiljil");
    console.log(request.body.topic);
    var inserted=null;
    if(request.body.topic!=undefined){
      userConnectionsDB.addConnection(request.body,request.session.theUser.UserID).then(function(){
        inserted=true;
        response.render('newConnection',{session:request.session.theUser,inserted:inserted});
      })
    }
    else{
      response.render('newConnection',{session:request.session.theUser,inserted:inserted});
    }

  }

  else if(!request.session.theUser){
    response.render('index',{session:undefined});
  }
})

module.exports = router;