# **Adjective Fire Danger/Smokey Bear**
Pulls Data from the RAWS stations and uses the most recent adjective fire rating
to determine fire danger for that specific day

## **Workflow**
Using a github actions yaml file an action occurs every hour that runs
*scripts/xml_parser.py* then pushes all new data to the github server.

## **index.js**
This code functions to pull data from hourly updated files and display the
correct corresponding smokey bear image

#### *Functions*
  *  *updateSmokeys()* - loops through the stations used for smokey bear
  *  *parseStation()* - gets the XML of the given station and sets the corresponding smokey to it
  *  *loadFile()* - opens the file and gets the text for the data required of smokey

## **xml_parser.py**
This script is run through an Ubuntu machine hosted by github. It uses the date and predefined
station numbers to retrieve and store XML data from the WIMS web service to be processed later

#### *Functions*
  * *main()* - Retrieves and stores XML data for the current day and previous day to determine
    the adjective fire danger at each station listed:
    [LA_PANZA, LAS_TABLAS, SLO, SAN_SIMEON]
  * *parse_xml()* - Parses the XML tree for the adjective fire danger ratings that we want,
    writes data to file as well as print to console
  * *get_xml()* - Creates a url from the given variables to pull adjective fire rating
    data
  * *get_dates()* - Gets dates for today and yesterday as well as time in PST, Formats
    dates for correct usage in the URL

## **update_sheet.py**
This code functions to update a google sheet that produces a graph representing the last 30 days of fire danger

#### *Functions*
  * *main()* - Updates the google sheet with the data pulled from the XML parser, gets run every day at 9 am locally on SLUG
  * *get_date_and_rating()* - Gets the date and adjective fire rating for a particular station
  * *get_sheet()* - Gets the first sheet of the workbook that holds the fire danger rating
  * *get_formatted_date()* - Gets the formatted current date for checking correct data

## **index.html**
Start page of the adjective fire danger,

## **sheets_update.bat**
Batch file that gets run on SLUG every morning that grabs current information to put into the spreadsheet. Must be done locally, if
it gets done through github actions then you would have to upload the json file that gives access to the google sheets
