#!/bin/bash

# Script used to run the python programs that update the
# fire danger google sheet that creates the graphs on 
# slocountyfire.org/adjective_fire_danger

echo "Moving to correct working directory"
pwd
cd ../volume1/public/_projects/Software/adjective_fire_danger
pwd

echo "-------------------------------------------------"
echo "Updating XML Text Docs"
python3 scripts/xml_parser.py
if [ $? -eq 0 ]; then
	echo "Finished parsing and updataing the XML data"
else
	echo "Failed to run xml_parser.py"
fi

echo "-------------------------------------------------"
echo "Updating Google Sheets"
python3 scripts/update_sheet.py
if [ $? -eq 0 ]; then
	echo "Finished updating the google sheet"
else
	echo "Failed to run update_sheets.py"
fi

echo "-------------------------------------------------"
echo "Updating Database"
python3 scripts/update_database.py
if [ $? -eq 0 ]; then
	echo "Finished updating the database"
else
	echo "Failed to update the database"
fi

echo "Finished"
