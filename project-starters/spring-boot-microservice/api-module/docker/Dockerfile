FROM openjdk:8u201-jdk-alpine3.9

MAINTAINER FranConnect <devops@franconnect.com>

ENV APP_JAR_NAME api-module
ENV APP_JAR_VERSION 0.0.1-SNAPSHOT

# Install curl
RUN apk --update add curl bash && \
        rm -rf /var/cache/apk/*

RUN mkdir -p /stackify-java-apm && \
    cd /stackify-java-apm && \
    wget https://download.stackify.com/stackify-java-apm/stackify-java-apm-latest.tar.gz; tar -zxvf  stackify-java-apm-latest.tar.gz; rm stackify-java-apm-latest.tar.gz && \
    ./install.sh

RUN mkdir /app
RUN mkdir /coverage

ADD docker/jacocoagent.jar /coverage/
ADD docker/jacococli.jar /coverage/

ADD target/${APP_JAR_NAME}-${APP_JAR_VERSION}.jar /app/

ADD docker/dd-java-agent.jar /app/
ADD docker/glowroot.jar /app/
ADD docker/startup.sh /app/
RUN chmod +x /app/startup.sh
ADD docker/wait-for-it.sh /app/
RUN chmod +x /app/wait-for-it.sh

WORKDIR /app

EXPOSE 8090

ENTRYPOINT ["/bin/bash","-c"]
CMD ["/app/startup.sh"]