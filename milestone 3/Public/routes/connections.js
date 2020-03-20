var express = require('express');
var router = express.Router();
var utility = require('../utility/connectionDB.js');

router.get('/', function(request, response) {

  var listTrek = utility.getConnections();

  var categories = [];
  for (var i = 0; i < listTrek.length; i++) {
    categories.push(listTrek[i].connection_category)
  }
  var uniqueCat = categories.filter((v, i, a) => a.indexOf(v) === i);
  console.log(uniqueCat);
  console.log(listTrek);
  response.render('connections.ejs', {
    qs: listTrek,
    session: request.session.theUser,
    uc: uniqueCat,
  });
});

module.exports = router;