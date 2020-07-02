
const LA_PANZA    = 44914 // inland
const LAS_TABLAS  = 44904 // inland
const SLO         = 44915 // coastal
const SAN_SIMEON  = 44917 // coastal

function init() {
  updateSmokeys();
}

function updateSmokeys() {
  for (station of [["LAS_TABLAS", "smokey_bear_inland"],
                  ["LA_PANZA", "smokey_bear_inland"],
                  ["SLO", "smokey_bear_coastal"],
                  ["SAN_SIMEON", "smokey_bear_coastal"]]) {

    parseStation(station[0], station[1]);
    console.log("-------------------------------------------------------------");
  }
}

function parseStation(station, type) {

  console.log("Loading data for: ", station)
  var text = loadFile("xml/".concat(station, ".txt"));
  text = text.split("\n");
  for(adj of text) {
    console.log(adj);
    adj = adj.split(" ");
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
}

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
