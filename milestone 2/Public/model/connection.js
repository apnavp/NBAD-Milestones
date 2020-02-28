module.exports.connection = class connection {
  constructor(connectionID, connection_name, connection_category, hosted_by,
    start_location, date_and_time, details, imageurl) {
    this.connectionID = connectionID;
    this.connection_name = connection_name;
    this.connection_category = connection_category;
    this.hosted_by = hosted_by;
    this.start_location = start_location;
    this.date_and_time = date_and_time;
    this.details = details;
    this.imageurl = imageurl;
  }

  //getter and setters
  get getConnectionId() {
    return this.connectionID;
  }
  set setConnectionId(connectionID) {
    this.connectionID = connectionID;
  }


  get getConnection_name() {
    return this.connection_name;
  }
  set setConnection_name(connectionName) {
    this.connection_name = connectionName;
  }


  get getconnection_category() {
    return this.connection_category;
  }
  set setconnection_category(connectionCategory) {
    this.connection_category = connectionCategory;
  }


  get hostedBy() {
    return this.hosted_by;
  }
  set setDetails(hostedBy) {
    this.hosted_by = hostedBy;
  }

  get startlocation() {
    return this.start_location;
  }
  set startlocation(startLocation) {
    this.start_location = startLocation;
  }

  get getDateAndTime() {
    return this.date_and_time;
  }
  set setDateAndTime(dateAndTime) {
    this.date_and_time = dateAndTime;
  }


  get Details() {
    return this.details;
  }
  set Details(Details) {
    this.details = Details;
  }

  get Imageurl() {
    return this.imageurl;
  }
  set Imageurl(imageUrl) {
    this.imageurl = imageUrl;
  }
}