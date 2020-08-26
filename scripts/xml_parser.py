import xml.etree.ElementTree as ET
import urllib.request
import datetime
import pytz
from pprint import pprint
from pytz import timezone


def main():
    """ Retrieves and stores XML data for the current day and previous day to determine
    the adjective fire danger at each station listed:
    [LA_PANZA, LAS_TABLAS, SLO, SAN_SIMEON]
    """

    today, yesterday, tm = get_dates()

    # stations typically used in FDOP looped through
    for station in [[44914, "LA_PANZA"],\
                    [44904, "LAS_TABLAS"],\
                    [44917, "SAN_SIMEON"],\
                    [44915, "SLO"],\
                    [44901, "BRANCH_MOUNTAIN"],\
                    [44916, "CARRIZO"]]:
        # retrieve the root of xml tree
        root = get_xml(station[0], yesterday, today)
        # parse root for data
        parse_xml(station, root)


def parse_xml(station, root):
    """ Parses the XML tree for the adjective fire danger ratings that we want,
    writes data to file as well as print to console

    Args:
        station: The array that holds the station number and name
        root: The root of the xml tree to be looked at
    """
    print(root[0][1].text)

    f = open("xml/" + station[1] + ".txt", "w")

    for child in root:
        adj = child.find("adj")

        if adj is None:
            continue;

        tm = child.find("nfdr_tm")
        dt = child.find("nfdr_dt")
        f.write(adj.text + tm.text + " " + dt.text + "\n")
        print(adj.text, tm.text, dt.text)

    f.close()


def get_xml(station, start, end):
    """ Creates a url from the given variables to pull adjective fire rating
    data

    Args:
        station: The number associated with the station, must be int
        start: The start date in dd-MMM-yy format to get data from
        end: The end date in dd-MMM-yy format to get data from

    Returns:
        root: the root of the xml tree from the data
    """

    url = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=" + str(station) + \
          "&start=" + start + "&end=" + end +"&ndays=&sort=&type=";


    print("URL being used:")
    print(url)

    response = urllib.request.urlopen(url).read()

    f = open("xml/temp.xml", "w")
    f.write(response.decode("utf-8"))
    f.close()

    tree = ET.parse("xml/temp.xml")
    root = tree.getroot()

    return root


def get_dates():
    """ Gets dates for today and yesterday as well as time in PST, Formats
    dates for correct usage in the URL

    Returns:
        today: Todays date in dd-MMM-yy format
        yesterday: Yesterdays date in dd-MMM-yy format
        time: Current PST time
    """

    # Gets current UTC datetime object then converts to PST one
    utc_current = datetime.datetime.utcnow().replace(tzinfo=pytz.utc)
    pst_zone = pytz.timezone('US/Pacific')
    pst_current = pst_zone.normalize(utc_current.astimezone(pst_zone))

    # Uses today's date to convert to yesterday's date
    today = pst_current.date()
    yesterday = today - datetime.timedelta(days=1)
    tm = pst_current.time()

    # Formats the dates correctly
    td = today.strftime("%d-%b-%y")
    yd = yesterday.strftime("%d-%b-%y")

    print(td, yd)

    return td, yd, tm


if __name__ == "__main__":
    main()
