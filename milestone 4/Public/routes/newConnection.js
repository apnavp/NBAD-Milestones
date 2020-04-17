var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var utility = require('../utility/connectionDB.js');
var userDbUtil = require('../utility/userDB');
var userProfile = require('../model/userprofile');
var userConnectionsDB=require('../utility/UserConnectionDB.js')

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var inserted=null;
router.get('/', function(request, response) {
  if(request.session.theUser)
  {
  console.log("inside new connection route js");
  response.render('newConnection.ejs', {
    session: request.session.theUser,inserted:inserted
  });
}
});

router.post('/',urlencodedParser,function(request,response){
  console.log(request.body);
  if(request.session.theUser)
  {
    console.log("in new info new connection");
    console.log(request.body);

    if(request.body!=undefined){
      userConnectionsDB.addConnection(request.body,request.session.theUser.firstName).then(function(){
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