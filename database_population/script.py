import requests
import logging
import json
import sys
import re
import os

# PRODUCT_API_URL = os.getenv("PRODUCT_API_URL", "http://localhost:3000")
PRODUCT_API_URL = 'http://localhost:3000'

FORMAT = '%(asctime)-15s %(levelname)s %(message)s'
logging.basicConfig(
    # filename='logfile.txt',
    # filemode='a',
    level=logging.DEBUG,
    format=FORMAT
)

def read_file(filename):
    f = open(filename, 'r')
    content = f.read().split('\n')

    return content


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


def get_respective_id(product, tablename):
    content = get_all_request(f'{tablename}')
    ids = [x['id'] for x in content if x['name'] == product[tablename]]
    if ids:
        ids = ids[0]
    else:
        logging.error(f'{tablename.upper()} does not exist for {product["name"]}')

    return ids


def handle_updating_tables(product, tablename, content):
    '''
    Checks if categories and subcategories from product exists in database
    If don't, creates them

    Params: product json, name of table to update, all content of table retrieved from db
    Return: new content of table updated
    '''

    # Gets the unique param to check if it exists in database
    if tablename == 'product':
        name = product['name']
    elif tablename == 'category':
        name = product['category']
    elif tablename == 'subcategory':
        name = product['subcategory']

    if name in list(map(lambda x: x['name'], content)):
        logging.info(f'{tablename.upper()} already exists')
    else:
        if tablename == 'category':
            payload = {'name': product[tablename]}
        elif tablename == 'subcategory':
            id_category = get_respective_id(product, 'category')
            payload = {'name': product[tablename], 'idCategory': id_category}
        elif tablename == 'product':
            id_subcategory = get_respective_id(product, 'subcategory')
            payload = product
            payload['idSubcategory'] = id_subcategory
            del payload['category']
            del payload['subcategory']

        r = requests.post(f'{PRODUCT_API_URL}/{tablename}/', json=payload)
        if r.status_code == 200:
            logging.info(f'{tablename.upper()} successfully added')
            content = get_all_request(tablename)
        else:
            logging.error(f'Error on requesting PRODUCT API: {r.status_code}')

    return content


def main():
    content = read_file('all_prods.json')
    categories = get_all_request('category')
    subcategories = get_all_request('subcategory')
    products = get_all_request('product')

    for line in content:
        product = json.loads(line)

        try:
            categories = handle_updating_tables(product, 'category', categories)
            subcategories = handle_updating_tables(product, 'subcategory', subcategories)

            if(product['price']):
                price = re.search('[0-9]+,[0-9]{2}$', product['price'])
                if price:
                    price = price.group(0)
                    product['price'] = price.replace(',', '.')
                    products = handle_updating_tables(product, 'product', products)
                else:
                    logging.error(f'Error on parsing price {product["price"]}')
        except:
            logging.error(f'An unmapped exception occured')
            sys.exit()


if __name__ == '__main__':
    main()
