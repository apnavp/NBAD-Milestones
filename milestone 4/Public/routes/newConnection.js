var express = require('express');
var router = express.Router();
var bodyParser= require('body-parser');
var utility = require('../utility/connectionDB.js');
var userDbUtil = require('../utility/userDB');
var userProfile = require('../model/userprofile');
var userConnectionsDB=require('../utility/UserConnectionDB.js')
var urlencodedParser = bodyParser.urlencoded({extended :false});


router.all('/',urlencodedParser,function(req,res){
  if(req.session.theUser)
  {
    console.log("in new info jiljil");
    console.log(req.body.topic);
    var inserted=null;
    if(req.body.topic!=undefined){
      userConnectionsDB.addConnection(req.body,req.session.theUser.UserID).then(function(){
        inserted=true;
        res.render('newConnection',{session:req.session.theUser,inserted:inserted});
      })
    }
    else{
      res.render('newConnection',{session:req.session.theUser,inserted:inserted});
    }

  }

  else if(!req.session.theUser){
    res.render('index',{session:undefined});
  }
})

module.exports = router;