#
# Nightwatch.js Dockerfile
#
FROM alpine:3.7

RUN apk --no-cache add \
  # Install NodeJS:
  nodejs \
  # Install ffmpeg for video recording:
  ffmpeg \
  && npm install -g \
  # Install Nightwatch.js:
  nightwatch@'<1.0' \
  # Clean up obsolete files:
  && rm -rf \
  /tmp/* \
  /root/.npm

# Add node system user/group with uid/gid 1000.
# This is a workaround for boot2docker issue #581, see
# https://github.com/boot2docker/boot2docker/issues/581
RUN adduser -D -u 1000 node

USER node

WORKDIR /app

RUN npm i --production

ENTRYPOINT ["./entrypoint.sh"]
