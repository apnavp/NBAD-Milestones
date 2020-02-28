var express = require('express');
var router = express.Router();
var utility = require('../utility/connectionDB.js');

router.get('/', function(request, response) {
  var ID = request.query.ID;
  console.log("id not found");
  var listTrek = utility.getConnection(ID);
  console.log(listTrek);

  if (listTrek == undefined) {
    var listTrek = utility.getConnections();
    var categories = [];
    for (var i = 0; i < listTrek.length; i++) {
      categories.push(listTrek[i].connection_category)
    }
    var uniqueCat = categories.filter((v, i, a) => a.indexOf(v) === i);
    console.log(uniqueCat);
    response.render('connections.ejs', {
      qs: listTrek,
      uc: uniqueCat
    });

  }
  //  else if (listTrek.connectionID == ID) {
  //   validIDResponse.push(listTrek);
  //   console.log(validresponse);
  // }
  else {

    response.render('connection.ejs', {
      qs: listTrek
    });
  }

});

module.exports = router;