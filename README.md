# **Adjective Fire Danger/Smokey Bear**
Pulls Data from the RAWS stations and uses the most recent adjective fire rating
to determine fire danger for that specific day.

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
  * *main()* - Updates the google sheet with the data pulled from the XML parser, gets run every day at 9 am locally on the x-drive
  * *get_date_and_rating()* - Gets the date and adjective fire rating for a particular station
  * *get_sheet()* - Gets the first sheet of the workbook that holds the fire danger rating
  * *get_formatted_date()* - Gets the formatted current date for checking correct data

## **update_database.py**
A short script for updating the fire danger in the database connects to the Firestore Database then updates the documents that hold the adjective fire danger for the unit app

#### *Functions*
  * *main()* - Gets the database credentials, time and calls for an update to the database
  * *update_document()* Updates the documents in the Firestore that hold the Smokey Bear data


## **index.html**
Start page of the adjective fire danger

## **update_fire_danger.sh**
This is the file that gets run on the x-drive every morning at 9 am and grabs the prediction for the adjective fire danger
on that day. It runs scripts/xml_parser.py and scripts/update_sheet.py to update the google sheets that create the graphs
for the last 30 and 90 days

## **sheets_update.bat**
Old batch file, still can be used to update the google sheets manually if need be. Runs xml_parser and update_sheet
to create the graphs for the last 30 and 90 days

## **Notes**
1) In order for you to use scripts/update_sheet.py you must have the fire_danger_secrets.json in the root
  directory for the project. *DO NOT PUT THIS FILE ON GITHUB!*
2) In order for you to use the scripts/update_databse.py you must have the unitapp_admin.json in the root
  directory for the project. *DO NOT PUT THIS FILE ON GITHUB*
3) The github actions script updates the text files in the github repo once an hour but does not do anything to
  update the google sheet. The x-drive runs the same update script once a day then uses that data to update the
  google sheet.
