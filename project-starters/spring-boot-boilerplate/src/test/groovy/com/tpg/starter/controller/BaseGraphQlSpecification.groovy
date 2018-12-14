package com.tpg.starter.controller

import com.fasterxml.jackson.core.JsonProcessingException
import com.fasterxml.jackson.databind.ObjectMapper
import com.fasterxml.jackson.databind.node.ObjectNode
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.core.io.Resource
import org.springframework.core.io.ResourceLoader
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import org.springframework.util.StreamUtils
import spock.lang.Specification

import java.nio.charset.StandardCharsets

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post

@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BaseGraphQlSpecification extends Specification {

    private static final String GRAPH_QL_PATH = "/graphql"

    @Autowired
    private ResourceLoader resourceLoader

    @Autowired
    private MockMvc mockMvc

    private objectMapper = new ObjectMapper()

    ResultActions performGraphQlPost(String query) throws Exception {
        return performGraphQlPost(query, null)
    }

    ResultActions performGraphQlPost(String graphqlResource, ObjectNode variables) throws Exception {
        def graphql = loadQuery(graphqlResource)
        def payload = createJsonQuery(graphql, variables)

        return mockMvc.perform(post(GRAPH_QL_PATH)
                .contentType(MediaType.APPLICATION_JSON)
                .content(payload)
        )
    }

    ObjectNode newVariablesObject() {
        return new ObjectMapper().createObjectNode()
    }

    private String loadQuery(String location) throws IOException {
        Resource resource = resourceLoader.getResource("classpath:" + location)
        return loadResource(resource);
    }

    private String loadResource(Resource resource) throws IOException {
        InputStream inputStream = resource.getInputStream()
        return StreamUtils.copyToString(inputStream, StandardCharsets.UTF_8)
    }

    private String createJsonQuery(String graphql, ObjectNode variables)
            throws JsonProcessingException {

        ObjectNode wrapper = objectMapper.createObjectNode()
        wrapper.put("query", graphql)
        if (variables != null) {
            wrapper.set("variables", variables)
        }
        return objectMapper.writeValueAsString(wrapper);
    }

}
