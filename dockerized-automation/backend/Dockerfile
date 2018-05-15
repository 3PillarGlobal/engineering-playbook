# nodeJS based example
FROM node:8.7.0

WORKDIR /app

COPY *.yml run.sh .npmignore ./

RUN npm install -g dynamodb

COPY src src
COPY misc misc
COPY deployment deployment

VOLUME /app/src

# run.sh is your entrypoint
CMD ["./run.sh"]