import requests
import logging
import json
import sys
import re
import os
import itertools
import random
import time

FORMAT = '%(asctime)-15s %(levelname)s %(message)s'
logging.basicConfig(
    # filename='logfile.txt',
    # filemode='a',
    level=logging.DEBUG,
    format=FORMAT
)


PRODUCT_API_URL = os.getenv("PRODUCT_API_URL", "http://localhost:3000")
# PRODUCT_API_URL = 'http://localhost:3000'


def get_all_request(table):
    r = requests.get(f'{PRODUCT_API_URL}/{table}')
    if r.status_code == 200:
        categories = r.json()
    elif r.status_code == 404:
        categories = []
    else:
        logging.error(f'Error on requesting PRODUCT API: {r.status_code}')
        raise Exception
    return categories


def generate_rfids_list(products_number):
    """
    Create rfids list in accepted format
    >>> Params:
    products_number: Integer -> number of products in database
    """
    allowed_numbers = list(range(0,10))
    allowed_numbers_str = [ str(number) for number in allowed_numbers ]

    allowed_characters = list(map(chr, range(65, 71))) # uppercase A - F indexes
    allowed_digits = allowed_numbers_str + allowed_characters

    rfids_list = list( map(''.join, itertools.islice(itertools.product(allowed_digits, allowed_digits, ['-'],
                                                                       allowed_digits, allowed_digits, ['-'],
                                                                       allowed_digits, allowed_digits, ['-'],
                                                                       allowed_digits, allowed_digits, ['-'],
                                                                       allowed_digits, allowed_digits, ['-'],
                                                                       allowed_digits, allowed_digits, ['-'],
                                                                       allowed_digits, allowed_digits),
                                                                       products_number + 1)))
    return rfids_list

def str_time_prop(start, end, format, prop):
    """Get a time at a proportion of a range of two formatted times.

    start and end should be strings specifying times formated in the
    given format (strftime-style), giving an interval [start, end].
    prop specifies how a proportion of the interval to be taken after
    start.  The returned time will be in the specified format.
    """

    stime = time.mktime(time.strptime(start, format))
    etime = time.mktime(time.strptime(end, format))

    ptime = stime + prop * (etime - stime)

    return time.strftime(format, time.localtime(ptime))


def random_date(start, end, prop):
    return str_time_prop(start, end, '%Y-%m-%d', prop)

def build_item_json(rfid, expiration_date, product_id):
    """
    Build item json for post request.
    >>> Params:
    rfid: String -> String in accepted format
    expiration_date -> String in format %Y-%m-%d, indicates product expirationdate
    product_id: Integer -> Indicate product id in database
    """
    item_json = {
        "rfid": rfid,
        "expirationDate": expiration_date,
        "idProduct": product_id
    }
    return item_json


def create_items(products_number, rfids_list, table):
    """
    Create items in database
    >>> Params:
    products_number: Integer -> number of products in database
    rfids_list: List of Strings -> List with rfids in accepted format
    table: String -> Indicate table name. Should be passed 'item'
    """
    for i in range(1, products_number + 1):
        try:
            item_json = build_item_json(rfids_list[i],
                                        random_date("2019-01-01",
                                                    "2019-10-20",
                                                    random.random()),
                                        i) 
            requests.post(f'{PRODUCT_API_URL}/{table}', json=item_json)
            logging.info(f'{table.upper()} successfully added')
        except Exception as ex:
            logging.error(f'An unmapped exception occured')
            logging.error(ex)
            sys.exit()
def main():
    all_produts = get_all_request('product')
    products_number = len(all_produts)
    rfids_list = generate_rfids_list(products_number)
    create_items(products_number, rfids_list, "item")

if __name__ == '__main__':
    main()