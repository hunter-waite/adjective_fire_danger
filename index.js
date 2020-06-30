
const LA_PANZA    = 44904
const LAS_TABLAS  = 44971
const SLO         = 44915
const SAN_SIMEON  = 44917

function init() {
  dates = curr_date();
  today = dates[0];
  yesterday = dates[1];
  console.log("Today's date is: " + today);
  console.log("Yesterday's date was: " + yesterday);


}

// gets the current date for use in the url of the xml data
function curr_date() {
  var today = new Date();   // get the date
  yy = String(today.getFullYear()).slice(-2); // get the last two digits of the year
  dd = String(today.getDate()).padStart(2, '0');  // day
  mm = "None";  // get the month and convert to 3 letter code
  switch(today.getMonth() + 1) {
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
  today = dd + '-' + mm + '-' + yy;
  yesterday = dd-1 + '-' + mm + '-' + yy;
  return([today, yesterday]);
}

function update_danger() {

}
