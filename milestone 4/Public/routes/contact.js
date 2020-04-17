var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {

  response.render('contact.ejs', {
    session: request.session.theUser
  });
});


module.exports = router;