import gspread
import datetime
import pytz
from pprint import pprint
from pytz import timezone

def main():
    """ Used to update a google sheet with the information retireved by xml_parser
    Note that this gets run every day at 9 am so the adjective_fire_rating will
    be the prediction that was posted for that day """
    # Gets access to the google sheet
    fd_sheet = get_sheet()
    # Row to be added on to the google sheet
    new_row = []
    # Gets the current date and appends it to the new row
    dt = get_formatted_date()
    new_row.append(dt)



    # loops through all the typical FDOP stations to get data
    for station in ["LA_PANZA", "LAS_TABLAS", "SLO", "SAN_SIMEON", "BRANCH_MOUNTAIN", "CARRIZO"]:
        # gets date and time
        date, rating = get_date_and_rating(station)
        # if the dates don't match then it is incorrect data do nothing
        if date != dt:
            new_row.append("OUTDATED: " + rating + ", Last Updated: " + date)
        else:
            new_row.append(rating)
        new_row.append(None)

    # append the new row to the top of the data
    fd_sheet.insert_row(new_row, index=4)


def get_date_and_rating(station):
    """ Gets the date and rating for the station in the already parsed xml file

    Args:
        station: station name associated with the text file holding its data

    Returns:
        date: the date from the most recent update
        rating: the adjective fire danger rating
    """
    # creates standardized file location and opens it
    file_location = "xml/" + station + ".txt"
    f = open(file_location)

    # read the data and split on newlines and spaces, only take the most recent
    data = f.read().split("\n")[0].split(" ")
    f.close()
    return data[2], data[0]


def get_sheet():
    """ Gets the sheet that holds historic data for fire danger

    Returns:
        sheet: access token to the first sheet of the Fire Danger workbook
    """
    # connect to the service account from google's API
    gc = gspread.service_account(filename="fire_danger_secrets.json")
    # get the specific google workbook with its url key
    sh = gc.open_by_key("1HwVdSH6etFwk1fdwfl7U0CJESmFMbmA2_H-cAPvgCXE")
    # get the first and only sheet
    sheet = sh.sheet1
    return sheet


def get_formatted_date():
    """ Gets the properly formatted date to be used when checking for correct data

    Returns:
        dt: Todays date formatted mm/dd/yyyy
    """
    # Gets current UTC datetime object then converts to PST one
    utc_current = datetime.datetime.utcnow().replace(tzinfo=pytz.utc)
    pst_zone = pytz.timezone('US/Pacific')
    pst_current = pst_zone.normalize(utc_current.astimezone(pst_zone))

    # Gets todays date
    today = pst_current.date()

    # Formats the dates correctly
    dt = today.strftime("%m/%d/%Y")
    return dt


if __name__ == "__main__":
    main()
