# Objective
Aggregate all the colors and sizes available for a `style of product` and save
it corresponding to each variant of the `style of product`. Also find store id
and minimum price among the stores product is available in

## initialize.sh
This is where you can setup the environment for your app.
You can install software and dependencies via this file.

## input_sample.csv
The sample input file consists of a product catalog data as follows:
* A row contains product details with a unique product id and store
availability info
* There are multiple rows with same product id for different stores, different
color and different sizes
* A `style of product` can be uniquely identified by column 6 and 10

## mapper.py
Mapper will take the input and organize the csv data and write the intermediate
 output on `stdout` as `\t` tab separated values.

## reducer.py
Reducer will receive the sorted output from mapper and aggregate colors, sizes
and other details for a `style of product` and save to database.