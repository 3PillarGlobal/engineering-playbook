#!/bin/bash

# The environment variables are already set up by the Dockerfile
java $JAVA_OPTS $APM -Djava.security.egd=file:/dev/urandom -Dspring.profiles.active=docker -Dlogging.path=/var/log -jar ${APP_JAR_NAME}-${APP_JAR_VERSION}.jar