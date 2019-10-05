import requests
import logging
import json

PRODUCT_API_URL = 'http://localhost:3000'
FORMAT = '%(asctime)-15s %(levelname)s %(message)s'

logging.basicConfig(
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
    else:
        logging.error(f'Error on requesting PRODUCT API: {r.status_code}')
        raise Exception
    return categories


def handle_updating_tables(product, tablename, content):
    '''
    Checks if categories and subcategories from product exists in database
    If don't, creates them
    '''
    payload = dict()
    payload['category'] = {'name': product[tablename]}
    payload['subcategory'] = {'name': product[tablename], 'idCategory': ''}

    if product[tablename] in list(map(lambda x: x['name'], content)):
        logging.info(f'{tablename.upper()} already exists')
    else:
        if tablename == 'subcategory':
            categories = get_all_request('category')
            categories_ids = [x['id'] for x in categories if x['name'] == product['category']]
            if categories_ids:
                payload['subcategory']['idCategory'] = categories_ids[0]
            else:
                logging.error('Category does not exist for category')

        r = requests.post(f'{PRODUCT_API_URL}/{tablename}/', json=payload[tablename])
        if r.status_code == 200:
            logging.debug(f'{tablename.upper()} {product[tablename]} successfully added')
            content = get_all_request(tablename)
        else:
            logging.error(f'Error on requesting PRODUCT API: {r.status_code}')

    return content

def main():
    content = read_file('all_prods.json')
    categories = get_all_request('category')
    subcategories = get_all_request('subcategory')

    for line in content:
        product = json.loads(line)

        categories = handle_updating_tables(product, 'category', categories)
        subcategories = handle_updating_tables(product, 'subcategory', subcategories)

        # if product['category'] in list(map(lambda x: x['name'], categories)):
        #     logging.info('Category already exists')
        # else:
        #     payload = {'name': product['category']}
        #     r = requests.post(f'{PRODUCT_API_URL}/category/', json=payload)
        #     if r.status_code == 200:
        #         logging.debug(f'Category {product["category"]} successfully added')
        #         categories = get_all_request('category')
        #     else:
        #         logging.error(f'Error on requesting PRODUCT API: {r.status_code}')

        # if product['subcategory'] in list(map(lambda x: x['name'], subcategories)):
        #     logging.info('Subcategory already exists')
        # else:
        #     payload = {'name': product['subcategory']}
        #     r = requests.post(f'{PRODUCT_API_URL}/subcategory/', json=payload)
        #     if r.status_code == 200:
        #         logging.debug(f'Subcategory {product["subcategory"]} successfully added')
        #         subcategories = get_all_request('subcategory')
        #     else:
        #         logging.error(f'Error on requesting PRODUCT API: {r.status_code}')


if __name__ == '__main__':
    main()