#!/usr/bin/env python3
"""
Script to load products json data to DynamoDB
"""
import json
import sys
from types import SimpleNamespace

import boto3
import logging
import argparse

# logging.basicConfig(filename='emr_out_1.log', level=logging.INFO)
from botocore.exceptions import ClientError

logger = logging.getLogger()


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


def get_db_client():
    """
    Method to create connection to DynamoDB
    :return: boto3 client object to access DynamoDB
    """
    try:
        return boto3.client(
            'dynamodb',
            region_name='us-east-1'
        )
    except Exception as e:
        logger.info('Unable to connect to DynamoDB. ' + str(e))


def get_db_resource():
    """
    Method to create connection to DynamoDB
    :return: boto3 client object to access DynamoDB
    """
    try:
        return boto3.resource(
            'dynamodb',
            region_name='us-east-1'
        )
    except Exception as e:
        logger.info('Unable to connect to DynamoDB. ' + str(e))


def add_product(product):
    """
    :param product: dictionary with product details
    :return:
    """
    table = get_db_resource().Table(TABLE_NAME)

    try:
        table.put_item(Item=product)
    except Exception as e:
        sys.stderr.write(str(product) + '__' + str(e) )


def create_table():
    """
    Method to create table in DynamoDB to store products data
    :return: SimpleNamespace object with success flag and error if any
    """
    try:
        get_db_client().create_table(
            AttributeDefinitions=[
                {'AttributeName': 'upc', 'AttributeType': 'S'},
                {'AttributeName': 'style_code', 'AttributeType': 'S'},
            ],
            TableName=TABLE_NAME,
            KeySchema=[
                {'AttributeName': 'upc', 'KeyType': 'HASH'},
                {'AttributeName': 'style_code', 'KeyType': 'RANGE'},
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        logger.info('Table created.')
    except ClientError as e:
        error = str(e.response['Error']['Message'])
        if e.response['Error']['Code'] == 'ResourceInUseException':
            # Table exists exception
            logger.info('Table exists.')
            return SimpleNamespace(success=True, error='Table exists.')
        else:
            # Some other exception
            logger.info(error)
            return SimpleNamespace(success=False, error=error)
    return SimpleNamespace(success=True, error='')


if __name__ == '__main__':

    TABLE_NAME = check_arg()

    if TABLE_NAME.split('_')[1] == 'korea':
        CURRENCY = 'KRW'
        CURRENCY_SYMBOL = '₩'
    else:
        CURRENCY = 'USD'
        CURRENCY_SYMBOL = '$'

    create_table()

    waiter = get_db_client().get_waiter('table_exists')

    waiter.wait(
        TableName=TABLE_NAME,
        WaiterConfig={
            'Delay': 10,
            'MaxAttempts': 5
        }
    )

    current_code = None
    current_upc = None
    current_min_price = None
    current_store_id = None
    current_row = {}
    current_colors = {}
    current_sizes = {}
    current_variants = {}
    current_availability = {}
    products_data = {}

    for line in sys.stdin:
        data = line.split('\t')

        # code is made up of style and class code
        # It identifies all products of a style
        code = data[0]
        colors = json.loads(data[1])
        sizes = json.loads(data[2])
        availability = json.loads(data[3])
        variants = json.loads(data[4])
        min_price = data[5]
        min_price_store_id = data[6]

        # row captures all the fixed data for a upc
        row = json.loads(data[7])
        upc = data[8].strip()

        if not min_price:
            min_price = '0'
            min_price_store_id = ' '

        # Updating the product data with min price
        row['min_price'] = {
            "currency": CURRENCY,
            "value": min_price,
            "currency_sign": CURRENCY_SYMBOL,
            "store_id": min_price_store_id
        }

        # Updating the product data with availability
        if upc not in current_availability:
            current_availability[upc] = (availability)
        else:
            current_availability[upc].update(availability)

        if not current_code:
            # Loop initialization block
            # Setting current variables for all the variable in rows
            current_code = code
            current_upc = upc
            current_row = row
            current_min_price = min_price
            current_store_id = min_price_store_id
            current_variants.update(variants)
            current_colors.update(colors)
            current_sizes.update(sizes)

            # Adding the current row product in the list of products so that
            # it can be added later with all the products that have same code
            products_data[current_upc] = current_row

            continue

        if not current_code == code:
            # If the code is changed, that means now there is different
            # product row
            # So, add the last product row in the products lists
            products_data[current_upc] = current_row

            for key, data in products_data.items():
                # Add common variants, color and sizes data to all products
                # Add all accumulated product with same code to database
                data['availability'] = current_availability[key]
                data['variants'] = current_variants
                data['colors_available'] = current_colors
                data['sizes_available'] = current_sizes
                add_product(data)

            # Update current variables with new row data
            current_code = code # New code
            current_upc = upc
            current_row = row
            current_variants = variants
            current_colors = colors
            current_sizes = sizes
            # Reset Availability data
            current_availability[current_upc] = (availability)

            current_min_price = min_price
            current_store_id = min_price_store_id
            current_row['min_price'] = {
                "currency": CURRENCY,
                "value": min_price,
                "currency_sign": CURRENCY_SYMBOL,
                "store_id": min_price_store_id
            }

            # Empty the products list of old code
            products_data.clear()

            # Add the current product to product list for new code
            products_data[current_upc] = current_row

        elif current_code == code and current_upc == upc:

            # If code and upc are same in the current row
            # update only availability and min price
            current_availability[current_upc].update(availability)

            if min_price < current_min_price:
                current_min_price = min_price
                current_row['min_price'] = {
                    "currency": CURRENCY,
                    "value": min_price,
                    "currency_sign": CURRENCY_SYMBOL,
                    "store_id": min_price_store_id
                }

            products_data[current_upc] = current_row

            # Update current upc
            current_upc = upc

        elif current_code == code and not current_upc == upc:

            # Code is same and upc is different
            # the row now has data of different variant

            if min_price < current_min_price:
                current_min_price = min_price
                current_row['min_price'] = {
                    "currency": CURRENCY,
                    "value": min_price,
                    "currency_sign": CURRENCY_SYMBOL,
                    "store_id": min_price_store_id
                }

            # Add the last current row (last row) product in the list
            products_data[current_upc] = current_row

            # Update common data for same code
            current_variants.update(variants)
            current_colors.update(colors)
            current_sizes.update(sizes)

            # Update row and upc
            current_row = row
            current_upc = upc

    # Add remaining products to database
    for key, data in products_data.items():
        data['availability'] = current_availability[key]
        data['variants'] = current_variants
        data['colors_available'] = current_colors
        data['sizes_available'] = current_sizes
        add_product(data)
