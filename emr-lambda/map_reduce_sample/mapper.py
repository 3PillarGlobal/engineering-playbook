#!/usr/bin/env python3
""""""
import argparse
import csv
import json
import sys
from datetime import datetime
from types import SimpleNamespace
import logging


logger = logging.getLogger()

CURRENCY_SYMBOL = '$'
CURRENCY = 'USD'


def check_arg(args=None):
    parser = argparse.ArgumentParser(
        description='Script to ingest product data from merged csv'
    )
    parser.add_argument('-t', '--table_name',
                        help='Name of product table',
                        required=True,
                        )

    results = parser.parse_args(args)

    return results.table_name


def mapper():
    """
    Method to create json file from csv
    :return:
    """

    for line in sys.stdin:

        logging.info(
            'Read line from merged csv in mapper ' + str(datetime.now())
        )

        row = list(csv.reader([line]))[0]
        ID = str(row[0])
        DIVISION_NAME = row[3]
        DESCRIPTION = row[1]
        STYLE_CODE = str(row[10])

        VARIANTS = {}
        COLOR_AVAILABLE = {}
        SIZES_AVAILABLE = {}
        DIVISION_CODE = str(row[2])
        DEPARTMENT_NAME = row[5]
        COLOR_CODE = str(row[11])
        CLASS_CODE = str(row[6])
        DEPARTMENT_CODE = str(row[4])
        SIZE_CODE = str(row[13])
        CLASS_NAME = row[7]

        # Creating variants dictionary
        # Mapping color_size to its upc
        VARIANTS[str(row[11]) + '_' + str(row[13])] = str(row[0])

        # Creating colors dictionary
        # Mapping color codes to their names
        COLOR_AVAILABLE[str(row[11])] = str(row[12])

        # Creating sizes dictionary
        # Mapping size codes to their names
        SIZES_AVAILABLE[str(row[13])] = str(row[14])

        availability = {}

        ACS_STYLE = row[15] if row[15] else ' '

        # Marking current store price as minimum price
        MIN_PRICE = row[19]
        MIN_PRICE_STORE_ID = str(row[16])

        # Checking if inventory data exists which starts at row[15]
        if row[16]: # store id
            availability['store_' + str(row[16])] = {

                "quantity": str(row[20]).strip(),
                "price": {
                    "currency": CURRENCY,
                    "currency_sign": CURRENCY_SYMBOL,
                    "value": str(row[18]) if str(row[18]) else ' '
                },
                "pos_price": {
                    "currency": CURRENCY,
                    "currency_sign": CURRENCY_SYMBOL,
                    "value": str(row[19]) if str(row[19]) else ' '
                },
                "store_id": str(row[16]) if str(row[16]) else ' '

            }

        # To handle non-empty string constraint of dynamo
        if MIN_PRICE is None:
            MIN_PRICE = "0"
            MIN_PRICE_STORE_ID = " "

        row = {
            'id': ID,
            'style_description': DESCRIPTION,
            'style_code': str(STYLE_CODE),
            'class_code': str(CLASS_CODE),
            'class_name': CLASS_NAME,
            'department_code': str(DEPARTMENT_CODE),
            'department_name': DEPARTMENT_NAME,
            'color_code': str(COLOR_CODE),
            'size_code': str(SIZE_CODE),
            'division_code': str(DIVISION_CODE),
            'division_name': DIVISION_NAME,
            'details': ' ',
            'size_guide': ' ',
            'locale': 'en-US',
            'images': {
                'official': [],
                'crowd_sourced': []
            },
            'availability': {},
            'acs_style': ACS_STYLE
        }
        data_to_write = str(STYLE_CODE + '-' + CLASS_CODE) + '\t' + \
                        json.dumps(COLOR_AVAILABLE) + '\t' + \
                        json.dumps(SIZES_AVAILABLE) + '\t' + \
                        json.dumps(availability) + '\t' + \
                        json.dumps(VARIANTS) + '\t' + \
                        str(MIN_PRICE) + '\t' + \
                        str(MIN_PRICE_STORE_ID) + '\t' + \
                        json.dumps(row) + '\t' + \
                        str(ID)

        sys.stdout.write(data_to_write + '\n')

    return SimpleNamespace(success=True)


if __name__ == "__main__":

    TABLE_NAME = check_arg()

    if TABLE_NAME.split('_')[1] == 'korea':
        CURRENCY = 'KRW'
        CURRENCY_SYMBOL = '₩'
    else:
        CURRENCY = 'USD'
        CURRENCY_SYMBOL = '$'

    mapper()
