## TODO: Set-up & run your frontend in a docker container

## example running a react app
FROM node:8.7.0-alpine

WORKDIR /app

COPY package.json package.json

RUN npm install

COPY src src
COPY public public

VOLUME /app/src

# run.sh is your entrypoint
CMD ["./run.sh"]