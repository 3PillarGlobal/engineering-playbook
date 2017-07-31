# sonarqube-server-docker
Setup a local Sonarqube instance using docker &amp; docker-compose. This instance is customised with the most useful plugins for Java related projects.

# Installation

## To stat it up
Run:
```
make up
```
or, if you don't like makefiles:
```
docker-compose up -d
```

On the first run it will buil the customised sonarqube server and than bring up the entire infrastructure. Subsequent runs will not build the image again.

## To take it down
Run:
```
make down
```
or, if you don't like makefiles:
```
docker-compose down -v
```

## To build the image again and run it
If you need to modify the Docker file, you might wanna build it again so the changes take effect.

Run:
```
make build
```
or, if you don't like makefiles:
```
docker-compose up --build -d
```

## Accesing it
Sonarqube will be accesible at http://localhost:9000/

Admin credentials: admin/admin
