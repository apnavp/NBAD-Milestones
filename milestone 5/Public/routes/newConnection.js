var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var userProfileDB = require('../utility/UserProfileDB.js')
const {
  check,
  validationResult,
  body
} = require("express-validator");

var urlencodedParser = bodyParser.urlencoded({
  extended: false
});

var inserted = null;
router.get('/', function (request, response) {
  if (request.session.theUser) {
    console.log("inside new connection route js");
    response.render('newConnection.ejs', {
      pageData:[],
      session: request.session.theUser,
      inserted: inserted
    });
  } else {
    response.render('index.ejs', {
      session: request.session.theUser
    });
  }
});

router.post('/',
    [
      check("connection_name")
      .not()
      .isEmpty()
      .withMessage("Name of event cannot be blank"),
      check("connection_category")
      .not()
      .isEmpty()
      .withMessage("Category cannot be blank"),
      check("start_location")
      .not()
      .isEmpty()
      .withMessage("Start location cannot be blank"),
      check("dateAndTime")
      .not()
      .isEmpty()
      .withMessage("Date and time field cannot be blank"),
      check("details")
      .not()
      .isEmpty()
      .withMessage("Details field cannot be blank")
    ],
    urlencodedParser, async function (request, response, next) {

      if (request.session.theUser) {
        console.log("in new info new connection");
        const errors = validationResult(request).array();
        console.log(errors);
        if (errors.length > 0) {
          let nameErrors = errors.find(val => {
            return val.param == "connection_name";
          });
          let categoryErrors = errors.find(val => {
            return val.param == "connection_category";
          });
          let locationErrors = errors.find(val => {
            return val.param == "start_location";
          });
          let dntErrors = errors.find(val => {
            return val.param == "dateAndTime";
          });
          let detailErrors = errors.find(val => {
            return val.param == "details";
          });
          let errorObject = [
            nameErrors,
            categoryErrors,
            locationErrors,
            dntErrors,
            detailErrors
          ];
          response.render("newConnection", {
            pageData: errorObject,
            session: request.session.theUser,
              inserted: inserted
          });
        }else{
          if (request.body != undefined) {
            await userProfileDB.addConnection(request.body, request.session.theUser.firstName).then(function () {
              inserted = true;
              response.render('newConnection', {
                pageData: errorObject,
                session: request.session.theUser,
                inserted: inserted
              });
            })
          } else {
            response.render('newConnection', {
              session: request.session.theUser,
              inserted: inserted});
          }
        } if (!request.session.theUser) {
          response.render('index', {
            session: undefined
          });
        }
      }else{
        console.log("user not logged in");
      }
    next();
  });

    module.exports = router;