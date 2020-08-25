
function init() {
  updatePage();
}

// Creates the fire danger map on the page with the SLO unit map outline
function updatePage() {
  var mymap = L.map('fire_danger_map').setView([35.272680, -120.401038], 9);  // basically the SLO County coordinates

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

                  // station name     lat, long                   image name
  for (station of [["LAS_TABLAS",     [35.656447, -120.9241],     "smokey_bear_inland"],
                  ["SLO",             [35.179347, -120.392719],   "smokey_bear_coastal"],
                  ["BRANCH_MOUNTAIN", [35.185233, -120.084989],   null],
                  ["CARRIZO",         [35.096528, -119.773222],   null],
                  ["SAN_SIMEON",      [35.59555, -121.1096],      null],
                  ["LA_PANZA",        [35.380725, -120.188094],   null]]) {

    console.log(station[0]);
    if(station[0] == "LAS_TABLAS" || station[0] == "SLO") {
      parseStation(station[0], station[2]);
    }
    createCircle(mymap, station[0], station[1], null);
  }
}

function createCircle(mymap, name, loc, danger) {
  var circle = L.circle(loc, {
    color: 'blue',
    fillColor: 'blue',
    fillOpacity: 0.5,
    radius: 5000
  }).addTo(mymap);
  circle.bindPopup(name);
}

// parses data to display the correct smokey bear image
function parseStation(station, type) {

  console.log("Loading data for: ", station)

  // loads file and splits at newline
  var text = loadFile("xml/".concat(station, ".txt"));
  if(text == null) {
    Console.log("Something happened, data no loaded");
    return;
  }
  text = text.split("\n");
  console.log(text[0]);

  // pulls first line as that is the most recent report and uses that
  adj = text[0].split(" ");

  // first single letter will always be one of the 5, selects smokey bear image
  switch(adj[0]) {
    case 'L':
      document.getElementById(type).setAttribute('src', './img/low.png');
      break;
    case 'M':
      document.getElementById(type).setAttribute('src', './img/moderate.png');
      break;
    case 'H':
      document.getElementById(type).setAttribute('src', './img/high.png');
      break;
    case 'V':
      document.getElementById(type).setAttribute('src', './img/veryhigh.png');
      break;
    case 'E':
      document.getElementById(type).setAttribute('src', './img/extreme.png');
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
