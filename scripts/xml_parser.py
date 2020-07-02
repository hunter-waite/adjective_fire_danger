import xml.etree.ElementTree as ET
import urllib.request
import datetime
from pprint import pprint
import pytz
from pytz import timezone


def main():

    get_dates()

    root = get_xml(None, None, None)

    for child in root:
        adj = child.find("adj")

        if adj is None:
            continue;

        tm = child.find("nfdr_tm")
        dt = child.find("nfdr_dt")
        print(adj.text, tm.text, dt.text)


def get_xml(station, start, end):
    """ Creates a url from the given variables to pull adjective fire rating
    data

    Args:
        station: The number associated with the station
        start: The start date in dd-MMM-yy format to get data from
        end: The end date in dd-MMM-yy format to get data from

    Returns:
        root: the root of the xml tree from the data
    """

    url = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44915&start=01-Jul-20&end=02-Jul-20&ndays=&sort=&type=";

    print("URL being used:")
    print(url)

    response = urllib.request.urlopen(url).read()

    f = open("xml/test.xml", "w")
    f.write(response.decode("utf-8"))
    f.close()

    tree = ET.parse("xml/test.xml")
    root = tree.getroot()

    return root


def get_dates():
    """ Gets the dates to be used in the various URL's

    Returns:
        today: Todays date in dd-MMM-yy format
        yesterday: Yesterdays date in dd-MMM-yy format
        time: Current PST time
    """

    utc_current = datetime.datetime.utcnow().replace(tzinfo=pytz.utc)
    pst_zone = pytz.timezone('US/Pacific')
    pst_current = pst_zone.normalize(utc_current.astimezone(pst_zone))

    today = pst_current.date()
    yesterday = today - datetime.timedelta(days=1)
    tm = pst_current.time()

    pprint("Current Date PST:" + str(today))
    pprint("Yesterday's Date PST:" + str(yesterday))
    pprint("Current Time PST:" + str(tm))

    return today, yesterday, tm


if __name__ == "__main__":
    main()
