// require the user model from models start
var User = require('../model/User.js')
// require the user model from models end

var mongoose = require('mongoose');
var schema = mongoose.Schema;

var userSchema = new schema({
  UserID: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    requied: true
  },
  emailAddress: {
    type: String,
    requied: true
  },
  address1Field: String,
  address2Field: String,
  city: String,
  state: String,
  postCode: String,
  country: String,
  password: String
});

var userModel = mongoose.model('users', userSchema);


module.exports.getUser = function (UserID, password) {
  return new Promise(resolve => {
    resolve(userModel.findOne({
      UserID: UserID
    }).then(function (data) {
      let users = [];
      console.log("in mongo" + data);
      if (data) {
        console.log("this is password" + password);
        if (data.password == password) {
          console.log("password match");
          console.log(data.password);
        }
      }
      if (data && data.password == password) {
        let userAdd = new User(data.UserID,
          data.firstName,
          data.lastName,
          data.emailAddress,
          data.address1Field,
          data.address2Field,
          data.city,
          data.state,
          data.postCode,
          data.country,
          data.password
        )
        return userAdd;
      } else
        console.log("password did not match");
      return null;
    }));
  });
}