var express = require('express');
var router = express.Router();

router.get('/', function (request, response) {

  response.render('about.ejs', {
    session: request.session.theUser
  });

});


module.exports = router;