# Getting Started

### Reference Documentation
For further reference, please consider the following sections:

* [Official Apache Maven documentation](https://maven.apache.org/guides/index.html)
* [Spring Boot Maven Plugin Reference Guide](https://docs.spring.io/spring-boot/docs/2.2.4.RELEASE/maven-plugin/)
* [Spring Boot Actuator](https://docs.spring.io/spring-boot/docs/2.2.4.RELEASE/reference/htmlsingle/#production-ready)

### Guides
The following guides illustrate how to use some features concretely:

* [Building a RESTful Web Service with Spring Boot Actuator](https://spring.io/guides/gs/actuator-service/)

### Swagger location

http://localhost:8090/sales/swagger-ui.html

http://localhost:8090/sales/v2/api-docs

### Hot deployment

You need to turn on a couple of features in IntelliJ to make this work.

First, there's a project specific setting which you would need to apply on any project you want to use devtools in. Go to Preferences > Compiler and enable "Make project automatically."

The next setting is an IDEA registry setting that applies to all projects.

In macOS (OSX), press Shift+Command+A (Shift+Ctrl+A in Windows)
Type "Registry" in the search box that appears, and select the registry to open it.
Lookup compiler.automake.allow.when.app.running and enable it.
After that, restart your app. You will notice that the project keeps rebuilding with every change you make. When you check out the result in the browser, you will see both static files and code have been updated.