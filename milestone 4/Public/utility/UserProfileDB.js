var mongoose = require('mongoose');

var connection=require('./connectionDB.js');

var Schema = mongoose.Schema;
var userConnectionsSchema = new Schema({
      UserID : String,
      connectionID:String,
      RSVP:String
});


var connectionDB=mongoose.model('connections',connection.connectionSchema);
var userConnectionsDB = mongoose.model('userConnections',userConnectionsSchema);


module.exports.getUserProfile= function(UserID)
{
    return new Promise(resolve =>{
          resolve(userConnectionsDB.find({UserID:UserID}).then(function(allConnections){
            return allConnections;
          })
        );
      });

};

module.exports.updateRSVP= function(connectionID, UserID, rsvp)
{
    return new Promise(resolve =>{
          resolve(userConnectionsDB.findOneAndUpdate({UserID:UserID,connectionID:connectionID},{RSVP:rsvp}).then(function(allConnections){
            console.log(allConnections);
            return allConnections;
          })
        );
      });

};

module.exports.addRSVP= function(connectionID, UserID, rsvp)
{

      return new Promise(resolve =>{
    resolve(userConnectionsDB.find({UserID:UserID,connectionID:connectionID},function(err,d){
        if(d.length === 0){
          var addObject = {
          UserID :UserID,
          connectionID:connectionID,
          RSVP:rsvp

        }
        var data = new userConnectionsDB(addObject)
        data.save()
        return "yes";
    }
  })
  )
});

};

module.exports.removeConnection = function(connectionID, UserID){
      return new Promise(resolve =>{
          resolve(userConnectionsDB.findOneAndDelete({UserID:UserID,connectionID:connectionID}).exec(function(err){
            return "yes";
          })
);
});
}

module.exports.addConnection= function(connection,hostedby){
  var ans = connection.connection_category.slice(0,2).toUpperCase();
  ans += Math.random().toString(36).slice(5);
  var bns=ans.slice(0,4);
  console.log("in random"+ans +"  "+bns);
  console.log(connection.details);
  return new Promise(resolve =>{
  resolve(connectionDB.find({connectionID:ans},function(err,d){
    if(d.length === 0){
      var addObject = {
      connectionID :bns,
      connection_name :connection.connection_name,
      connection_category :connection.connection_category,
      hosted_by :hostedby,
      start_location :connection.start_location,
      dateAndTime :connection.dateAndTime,
      details: connection.details,
      imageurl:"../assets/images/man.png",
    }
    var data = new connectionDB(addObject)
    data.save()
    return "yes";
  }}))
});
}

