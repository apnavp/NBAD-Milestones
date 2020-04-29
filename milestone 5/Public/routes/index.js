var express = require('express');
var router = express.Router();
var utility = require('../utility/connectionDB.js');
var profileController = require('../controller/ProfileController.js');

router.get('/', function (request, response) {

  console.log(request.session.theUser);
  console.log("inside index route js");
  response.render('index.ejs', {
    session: request.session.theUser
  });
});

module.exports = router;