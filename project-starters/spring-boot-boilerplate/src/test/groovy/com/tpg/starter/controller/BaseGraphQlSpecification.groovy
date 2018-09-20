package com.tpg.starter.controller

import org.json.JSONException
import org.json.JSONObject
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.MediaType
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import org.springframework.test.web.servlet.ResultActions
import spock.lang.Specification

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post

@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("test")
class BaseGraphQlSpecification extends Specification {

    private static final String GRAPH_QL_PATH = "/graphql"

    @Autowired
    private MockMvc mockMvc

    ResultActions performGraphQlPost(String query) throws Exception {
        return performGraphQlPost(query, null)
    }

    ResultActions performGraphQlPost(String query, Map variables) throws Exception {
        return mockMvc.perform(post(GRAPH_QL_PATH)
                .contentType(MediaType.APPLICATION_JSON)
                .content(generateRequest(query, variables))
        )
    }

    private String generateRequest(String query, Map variables) throws JSONException {
        JSONObject jsonObject = new JSONObject();

        jsonObject.put("query", query);

        if (variables != null) {
            jsonObject.put("variables", new JSONObject(variables));
        }

        return jsonObject.toString()
    }
}
