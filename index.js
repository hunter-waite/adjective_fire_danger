
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

  var legend = L.control({ position: "bottomleft" });

  legend.onAdd = function(mymap) {
    var div = L.DomUtil.create("div", "legend");
    div.innerHTML += "<h4>Tegnforklaring</h4>";
    div.innerHTML += '<i style="background: #477AC2"></i><span>Water</span><br>';
    div.innerHTML += '<i style="background: #448D40"></i><span>Forest</span><br>';
    div.innerHTML += '<i style="background: #E6E696"></i><span>Land</span><br>';
    div.innerHTML += '<i style="background: #E8E6E0"></i><span>Residential</span><br>';
    div.innerHTML += '<i style="background: #FFFFFF"></i><span>Ice</span><br>';
    div.innerHTML += '<i class="icon" style="background-image: url(https://d30y9cdsu7xlg0.cloudfront.net/png/194515-200.png);background-repeat: no-repeat;"></i><span>Grænse</span><br>';

    return div;
  }

  legend.addTo(mymap);
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
      updateImg(station, './img/low.png')
      createCircle(mymap, station[0], station[1], '#00CC66', 'LOW');
      break;
    case 'M':
      updateImg(station, './img/moderate.png')
      createCircle(mymap, station[0], station[1], '#0099FF', 'MODERATE');
      break;
    case 'H':
      updateImg(station, './img/high.png')
      createCircle(mymap, station[0], station[1], '#FACB00', 'HIGH');
      break;
    case 'V':
      updateImg(station, './img/veryhigh.png');
      createCircle(mymap, station[0], station[1], '#FF6600', 'VERY HIGH');
      break;
    case 'E':
      updateImg(station, './img/extreme.png');
      createCircle(mymap, station[0], station[1], '#FF0000', 'EXTREME');
      break;
  }
}

// checks to make sure the image source is not null
// then updates the correct smokey bear
function updateImg(station, img) {
  if(station[2] != null) {
    document.getElementById(station[2]).setAttribute('src', img);
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
