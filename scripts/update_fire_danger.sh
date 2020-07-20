#!/bin/bash

# Script used to run the python programs that update the
# fire danger google sheet that creates the graphs on 
# slocountyfire.org/adjective_fire_danger

echo "Moving to correct working directory"
pwd
cd ..
pwd

echo "Running xml_parser.py"
python3 scripts/xml_parser.py
echo "Finished parsing and updataing the XML data"

echo "Running update_sheets.py"
python3 scripts/update_sheet.py
echo "Finished updating the google sheet"
