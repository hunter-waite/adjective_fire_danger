
const LA_PANZA    = 44904 // inland
const LAS_TABLAS  = 44971
const SLO         = "44915" // coastal
const SAN_SIMEON  = 44917

function init() {
  dates = curr_date();
  today = dates[0];
  yesterday = dates[1];
  console.log("Today's date is: " + today);
  console.log("Yesterday's date was: " + yesterday);

  get_xml_data(dates);
}

async function get_xml_data(dates) {
  console.log("Fetching the XML for current date");
  // url for current day
  var url = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=" + SLO + "&start=" + dates[1] + "&end=" + dates[0] + "&ndays=";
  var xml = await fetch(url, { mode : "no-cors"})
                  .then(response => response.text())
                  .then(str => (new window.DOMParser()).parseFromString(str, "text/xml"))
                  .then(data => console.log(data))
  console.log(url);
  console.log(xml);
}

// gets the current date and yesterdays for use in the url of the xml data
function curr_date() {
  var today = new Date();   // get todays date
  var yesterday = new Date();
  yesterday.setDate(today.getDate() - 1); // get yesterdays date

  tyy = String(today.getFullYear()).slice(-2); // get the last two digits of the year
  tdd = String(today.getDate()).padStart(2, '0');  // day
  tmm = get_month_from_num(today.getMonth()+1);  // get the month and convert to 3 letter code

  yyy = String(yesterday.getFullYear()).slice(-2); // get the last two digits of the year
  ydd = String(yesterday.getDate()).padStart(2, '0');  // day
  ymm = get_month_from_num(yesterday.getMonth()+1);  // get the month and convert to 3 letter code

  today = tdd + '-' + tmm + '-' + tyy;
  yesterday = ydd + '-' + ymm + '-' + yyy;
  return([today, yesterday]);
}

// takes in a month number and converts to 3 letter code
function get_month_from_num(mm) {
  switch(mm) {
    case 1: mm = "Jan"; break;
    case 2: mm = "Feb"; break;
    case 3: mm = "Mar"; break;
    case 4: mm = "Apr"; break;
    case 5: mm = "May"; break;
    case 6: mm = "Jun"; break;
    case 7: mm = "Jul"; break;
    case 8: mm = "Aug"; break;
    case 9: mm = "Sep"; break;
    case 10: mm = "Oct"; break;
    case 11: mm = "Nov"; break;
    case 12: mm = "Dec"; break;
  }
  return mm;
}

function update_danger() {

}
