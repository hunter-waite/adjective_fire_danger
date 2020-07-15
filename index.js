
const LA_PANZA    = 44914 // inland
const LAS_TABLAS  = 44904 // inland
const SLO         = 44915 // coastal
const SAN_SIMEON  = 44917 // coastal

function init() {
  updateSmokeys();
}

// updates the smokey bear images on load
function updateSmokeys() {
  // loop through all stations; LAS_TABLAS used for inland, SLO used for coastal
  for (station of [["LAS_TABLAS", "smokey_bear_inland"],
                  ["SLO", "smokey_bear_coastal"]]) {

    parseStation(station[0], station[1]);
    console.log("-------------------------------------------------------------");
  }
}

// parses data to display the correct smokey bear image
function parseStation(station, type) {

  console.log("Loading data for: ", station)

  // loads file and splits at newline
  var text = loadFile("xml/".concat(station, ".txt"));
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
