Spring Boot Boilerplate code.
Includes:
- spring security authentication and authorization (httpBasic + x-auth-token strategy)
- spring data
- integration testing with Spock
- pmd, findbugs, checkstyle
- jacoco test coverage
- sonar cube integration

There are 2 session configurations available
- InMemorySessionConfig - configured for <b>local</b> and <b>test</b> spring profiles
- RedisSessionConfig - configured for <b>dev</b> and <b>prod</b> spring profiles

In order to run a redis-session-enabled profile, you will need a running redis instance.
Docker instructions:
- install docker
- <i>docker run -p 6379:6379 redis:latest</i>

In order to check existing session in Redis:
- <i>docker exec -it <container_id> redis-cli</i>
- <i>KEYS *</i>
- <i>FLUSHALL</i> - in order to delete all stored sessions

GraphQL integration:
- http://localhost:8080/graphql
- http://localhost:8080/graphiql
- GraphQL and GraphiQL endpoints security is currently disabled
- list documents:
```
    query {
      getDocuments(pageNumber: 0, numberOfItems: 10){
        id
        name
        description
        url
      }
    }
```
- create new document:
```
    mutation {
      addDocument(name:"test doc", description:"test description", url:"http://someurl/test.pdf") {
        id
      }
    }
```
- get document by id:   
```
    {
      getDocument(id: 1) {
        id
        name
        description
        url
      }
    }
```
