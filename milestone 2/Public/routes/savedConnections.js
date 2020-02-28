var express = require('express');
var router = express.Router();

router.get('/', function(request, response) {
  console.log(request.params);
  response.render('savedConnections.ejs');
});


module.exports = router;