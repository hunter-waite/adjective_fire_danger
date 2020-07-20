#!/bin/bash

# Script used to run the python programs that update the
# fire danger google sheet that creates the graphs on 
# slocountyfire.org/adjective_fire_danger

echo "Moving to correct working directory"
pwd
cd ../volume1/public/_projects/Software/adjective_fire_danger
pwd

echo "Running xml_parser.py"
python3 scripts/xml_parser.py
if [ $? -eq 0 ]; then
	echo "Finished parsing and updataing the XML data"
else
	echo "Failed to run xml_parser.py"
fi

echo "Running update_sheets.py"
python3 scripts/update_sheet.py
if [ $? -eq 0 ]; then
	echo "Finished updating the google sheet"
else
	echo "Failed to run update_sheets.py"
fi

echo "Finished"
