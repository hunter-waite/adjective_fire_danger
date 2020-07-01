import xml.etree.ElementTree as ET
import urllib.request
import datetime
from pprint import pprint

def main():
    url = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44915&start=30-Jun-20&end=01-Jul-20&ndays=&sort=";

    print("URL being used:")
    print(url)

    response = urllib.request.urlopen(url).read()

    f = open("xml/test.xml", "w")
    f.write(response.decode("utf-8"))
    f.close()

    tree = ET.parse("xml/test.xml")
    root = tree.getroot()

    for child in root:
        adj = child.find("adj")

        if adj is None:
            continue;

        tm = child.find("nfdr_tm")
        dt = child.find("nfdr_dt")
        print(adj.text, tm.text, dt.text)

    get_dates()

def get_dates():
    """ Gets the dates to be used in the various URL's

    Returns:
        today: Todays date in dd-MMM-yy format
        yesterday: Yesterdays date in dd-MMM-yy format
    """
    today = datetime.date.today()
    yesterday = today - datetime.timedelta(days=1)

    return today, yesterday

if __name__ == "__main__":
    main()
