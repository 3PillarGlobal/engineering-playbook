#!/bin/bash

docker-compose build

docker-compose run --rm automation; EXIT_STATUS=$?

docker-compose down -v;

exit $EXIT_STATUS