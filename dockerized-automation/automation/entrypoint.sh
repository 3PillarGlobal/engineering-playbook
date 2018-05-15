#!/bin/sh

# shellcheck disable=SC2086
npm i --production

exec ./wait-for.sh --timeout "${WAIT_FOR_TIMEOUT:-120}" $WAIT_FOR_HOSTS -- \
  ./run.sh
