# Getting Started

## Pre-requirements

- jdk 1.13
- maven (checked with 3.6.1)
- docker


### Maven configuration

In order for maven to work properly with maven, you need to modify the JAVA_HOME environment in `~/.mavenrc` and `~/.bash_profile` to point to JDK 1.13:

```bash
export JAVA_HOME="$(/usr/libexec/java_home -v13)"
```

## Code Coverage

For seeing the code overage, we are using the jacoco plugin. In order to generate a readable report, you need to run the command 
```bash
mvn jacoco:report
```

A report should be generated in `target/site/index.html/` which you can visualize in a browser.

>Note: You need to run the tests before, in order for the report to be generated.
 
 ### Check minimum code coverage
 
In order to check that the minimum code coverage was met, run the command 
 ```bash
mvn verify
```

> Note: The minimum code coverage is set in the `UNIT_TEST_COVERAGE` environment variable.
