import update_sheet
import firebase_admin
from firebase_admin import credentials
from firebase_admin import firestore
from pprint import pprint


def main():
    """ A short script for updating the fire danger in the database
    connects to the Firestore Database then updates the documents that hold
    the adjective fire danger for the unit app"""
    # get credentials for the firestore and initialize app
    cred = credentials.Certificate('unitapp_admin.json')
    firebase_admin.initialize_app(cred)
    # obtain a database reference
    db = firestore.client()

    date = update_sheet.get_formatted_date()

    # update the document for the Coastal smokey bear
    update_document(db, "SLO", "Coastal", date)
    # update the document for the Inland smokey bear
    update_document(db, "LAS_TABLAS", "Inland", date)


def update_document(db, station, region, correct_date): 
    """ Updates the documnets that hold data for the smokey bear

    Args:
        db: Firestore Database reference
        station: Station name associated with the text file holding its data
        region: The region that the station is in (Coastal or Inland)
        correct_date: The correct date to compare against the update

    """
    date, rating = update_sheet.get_date_and_rating(station)
    smokey_ref = db.collection('Smokey').document(region)

    if date != correct_date:
        date = "Wrong Date Data"

    smokey_ref.set({
        'Date'      : date,
        'Rating'    : rating
    })   


if __name__ == "__main__":
    main()
