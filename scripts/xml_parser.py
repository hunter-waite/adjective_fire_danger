import xml.etree.ElementTree as ET
import urllib.request
from pprint import pprint

def main():
    url = "https://fam.nwcg.gov/wims/xsql/nfdrs.xsql?stn=44915&start=30-Jun-20&end=01-Jul-20&ndays=";

    print("URL being used:")
    print(url)

    response = urllib.request.urlopen(url).read()

    f = open("xml/test.xml", "w")
    f.write(response.decode("utf-8"))
    f.close()

    tree = ET.parse("xml/test.xml")
    root = tree.getroot()

    for child in root:
        for adj in child.findall("adj"):
            print(adj)

if __name__ == "__main__":
    main()
