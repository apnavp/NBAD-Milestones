// require the connection model from models start
var connectionModel = require('../model/connection');

// require the connection model from models end


// data storing for database start for all categories and topics

//data for Chandrashila
var Chandrashila = {
  connectionID: "TK1",
  connection_name: "Chandrashila",
  connection_category: "Trek",
  hosted_by: "John Doe",
  start_location: "Delhi",
  dateAndTime: "Jan 31,  5pm",
  details: "Chandrashila is summit of the Tungnath . It literally means \"Moon Rock\". It is located at a height of about 4,000 metres (13,000 ft) above sea level. This peak provides views of the Himalayas, including Nandadevi, Trisul, Kedar Peak, Bandarpunch and Chaukhamba peaks. There are various legends associated with this place. According to one such legend, this is the place where Lord Rama meditated after defeating the demon-king Ravana. Another legend says that moon-god Chandra spent time here in penance.",
  imageurl: '../assets/images/man.png'
};

//data for Sandhakphu

var Sandhakphu = {
  connectionID: "TK2",
  connection_name: "Sandhakphu",
  connection_category: "Trek",
  hosted_by: "The one in orange jacket",
  start_location: "Una",
  dateAndTime: "Feb 12, 10am",
  details: "The trek along the Singalila Ridge to Sandakphu and Phalut is one of the most popular ones\ in the Eastern Himalayas due to the grand vistas of the Kangchenjunga range and the Everest range which can be seen from the ridge and also for the seasonal wildflower blooms and birding Treks begin at Manebhanjan which is 28 km from Darjeeling ",
  imageurl: '../assets/images/orange.jpeg'
};

//data for Gaumukh Tapovan

var Gaumukh = {
  connectionID: "TK3",
  connection_name: "Gaumukh Tapovan",
  connection_category: "Trek",
  hosted_by: "Flamingo travels",
  start_location: "Manali",
  dateAndTime: "Feb 16, 8am",
  details: "The most well known tapovan in India is the area above the Gangotri Glacier at one of the primary sources of the Ganges, in Uttarakhand, India. At the foot of Shivling peak, a barren area at about 4,463m (14640 feet) elevation, is a seasonal home to several sadhus living in caves, huts etc. and it has become a trekking destination also.[1] The trekking usually starts from Gomukh and the trek was considered moderate to difficult prior to the destruction of much of the trail from Gangotri to Gaumukh by the 2013 North Indian Floods. Tapovan area is base camp for several mountaineering expeditions including Shivling peak, Bhagirathi peak etc. Tapovan area is full of meadows, streams and flowering plants and the meadows are considered as one of the best high altitude meadow in India. In Tapovan a stream named Amrit Ganga - the nectar of the Ganges - flows into the glacier. There is also a place named Nandanvan near Tapovan, and Nandanvan is also trekked by trekkers and pilgrims. Nandanvan is also a spacious meadow located at the base of Bhagirathi massif",
  imageurl: '../assets/images/treker.jpg'

};

//data for Annapurna Base Camp
var Annapurna = {
  connectionID: "TK4",
  connection_name: "Annapurna Base Camp",
  connection_category: "Trek",
  hosted_by: "Tour Radar",
  start_location: "Himalayas",
  dateAndTime: "Feb 20, 7am",
  details: "The Annapurna Sanctuary is a high glacial basin lying 40 km directly north of Pokhara. This oval-shaped plateau sits at an altitude of over 4000 metres, and is surrounded by a ring of mountains, the Annapurna range, most of which are over 7000 metres",
  imageurl: '../assets/images/man_backpack.jpeg'

};

//data for Spiti valley Circuit

var Spiti = {
  connectionID: "TP1",
  connection_name: 'Spiti valley Circuit',
  connection_category: "Trip",
  hosted_by: "Travel Triange",
  start_location: "Spiti",
  dateAndTime: "Feb 22, 6am",
  details: "Spiti Valley is a cold desert mountain valley located high in the Himalayas in the north-eastern part of the northern Indian state of Himachal Pradesh. The name \"Spiti\" means \"The middle land\", i.e. the land between Tibet and India.",
  imageurl: '../assets/images/spiti.jpeg'

};

//data for Adventures in Meghalaya

var Adventures = {
  connectionID: "TP2",
  connection_name: 'Adventures in Meghalaya',
  connection_category: "Trip",
  hosted_by: "Bootcamp",
  start_location: "Meghalaya",
  dateAndTime: "Feb 24, 12pm",
  details: "Kayaking, Caving, Mountain Biking, and Trekking are the major adventure activities one can do in Meghalaya. Covered with lush green forests, Meghalaya provides one of the best trekking experiences. Even though few of the hikes are tiring, but the snow-covered mountains and pleasant landscapes make them worth.",
  imageurl: '../assets/images/meghalaya.jpeg'
};

//data for Hornbill Festival

var Hornbill = {
  connectionID: "TP3",
  connection_name: 'Hornbill Festival',
  connection_category: "Trip",
  hosted_by: "Travellers",
  start_location: "Kisama",
  dateAndTime: "Feb 26, 1pm",
  details: "The festival is attended by all of Nagaland's major tribes. It features traditional arts, dances, folk songs, and indigenous games. All this takes place amid immaculate replicas of tribal huts (morungs), complete with wood carvings and hollow log drum instruments. The drums are beat in haunting symphony at the end of the day. The festival's opening and closing ceremonies are another highlight, with spectacular shows from all the tribes in the amphitheater.",
  imageurl: '../assets/images/horn_bill.jpeg'

};

//data for DealCloud

var Zero = {
  connectionID: "TP4",
  connection_name: 'Ziro Music Festival',
  connection_category: "Trip",
  hosted_by: "Tailor made Journey",
  start_location: "Shannan, Tibet",
  dateAndTime: "Feb 28, 4pm",
  details: "Zero is a Winter Sport and Music Festival that started 5 years ago in Los Angles California.  Minus Zero is a unique festival experience unlike any other in the world.  Where else can you hit the slopes and ski right into the stage area while your favorite artist is performing and then head back to your cabin with your crew.   When it first launched in LA artists like Jamie Jones and Lee Burridge headlined.   From there we moved to the East coast and In April  2016 Minus Zero held its inaugural Vermont festival at Stratton Resort in Vermont with deadmau5 and Kaskade headlining. The Festival became an instant mainstay in the state and festival Circuit.  Minus Zero marks the start of Festival Season for many people.",
  imageurl: '../assets/images/ziro.jpeg'

};

// data storing for database end for all categories and topics


var allConnections = [
  Chandrashila,
  Sandhakphu,
  Gaumukh,
  Annapurna,
  Spiti,
  Adventures,
  Hornbill,
  Zero
];

// get connections function start
var getConnections = function() {
  var myList = [];
  for (i = 0; i <= allConnections.length - 1; i++) {
    let connection = new connectionModel.connection(
      allConnections[i].connectionID,
      allConnections[i].connection_name,
      allConnections[i].connection_category,
      allConnections[i].hosted_by,
      allConnections[i].start_location,
      allConnections[i].dateAndTime,
      allConnections[i].details,
      allConnections[i].imageurl);
    myList.push(connection);
  }
  return myList;
};
// get connections function end


// get connection function start
var getConnection = function(connectionID) {
  console.log(connectionID);
  for (i = 0; i < allConnections.length; i++) {
    if (allConnections[i].connectionID == connectionID) {
      let connection = new connectionModel.connection(
        allConnections[i].connectionID,
        allConnections[i].connection_name,
        allConnections[i].connection_category,
        allConnections[i].hosted_by,
        allConnections[i].start_location,
        allConnections[i].dateAndTime,
        allConnections[i].details,
        allConnections[i].imageurl);
      return connection;
    }
  }
};
// get connection function end

// exporting getConnections and getConnection
module.exports.getConnections = getConnections;
module.exports.getConnection = getConnection;