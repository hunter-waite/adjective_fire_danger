
function init() {
  updatePage();
}

// updates the smokey bears as well as
function updatePage() {
  // create map with slo county at the center and the correct size
  var mymap = L.map('fire_danger_map').setView([35.272680, -120.401038], 9);

  // create tile layer on map with San Luis Unit Map as the base layer from
  // the mapbox layer
  L.tileLayer('https://api.mapbox.com/styles/v1/slugis/ckafr87pa0kcy1iq5kmf2t1y9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoic2x1Z2lzIiwiYSI6IlB5TlZENVUifQ.Z597Ia0qffZlYcGpbJtzTA', {
    maxZoom: 18,
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
  }).addTo(mymap);

  // loops through all the availivble stations
                  // station name     lat, long                   image name
  for (station of [["LAS_TABLAS",     [35.656447, -120.9241],     "smokey_bear_inland"],
                  ["SLO",             [35.179347, -120.392719],   "smokey_bear_coastal"],
                  ["BRANCH_MOUNTAIN", [35.185233, -120.084989],   null],
                  ["CARRIZO",         [35.096528, -119.773222],   null],
                  ["SAN_SIMEON",      [35.59555,  -121.1096],     null],
                  ["LA_PANZA",        [35.380725, -120.188094],   null]]) {
    parseStation(station, mymap);
  }
}

// parses data to display the correct smokey bear image
function parseStation(station, mymap) {

  console.log("Loading data for: ", station[0])

  // loads file and splits at newline
  var text = loadFile("xml/".concat(station[0], ".txt"));
  if(text == null) {
    console.log("Something happened, data not loaded");
    return;
  }
  text = text.split("\n");
  console.log(text[0]);

  // pulls first line as that is the most recent report and uses that
  adj = text[0].split(" ");

  // first single letter will always be one of the 5, selects smokey bear image
  switch(adj[0]) {
    case 'L':
      if(station[2] != null) {
        document.getElementById(station[2]).setAttribute('src', './img/low.png');
      }
      createCircle(mymap, station[0], station[1], 'green', 'LOW');
      break;
    case 'M':
      if(station[2] != null) {
        document.getElementById(station[2]).setAttribute('src', './img/moderate.png');
      }
      createCircle(mymap, station[0], station[1], 'blue', 'MODERATE');
      break;
    case 'H':
      if(station[2] != null) {
        document.getElementById(station[2]).setAttribute('src', './img/high.png');
      }
      createCircle(mymap, station[0], station[1], 'yellow', 'HIGH');
      break;
    case 'V':
      if(station[2] != null) {
        document.getElementById(station[2]).setAttribute('src', './img/veryhigh.png');
      }
      createCircle(mymap, station[0], station[1], 'orange', 'VERY HIGH');
      break;
    case 'E':
      if(station[2] != null) {
        document.getElementById(station[2]).setAttribute('src', './img/extreme.png');
      }
      createCircle(mymap, station[0], station[1], 'red', 'EXTREME');
      break;
  }
}

// loads in the data from the XML folder using a GET request
function loadFile(filePath) {
  var result = null;
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", filePath, false);
  xmlhttp.send();
  if (xmlhttp.status==200) {
    result = xmlhttp.responseText;
  }
  return result;
}

// creates a circle that displays a pop up
function createCircle(mymap, name, loc, color, label) {
  var circle = L.circle(loc, {
    color: color,
    fillColor: color,
    fillOpacity: 0.5,
    radius: 5000
  }).addTo(mymap);
  circle.bindPopup(name + ': ' + label);
}
