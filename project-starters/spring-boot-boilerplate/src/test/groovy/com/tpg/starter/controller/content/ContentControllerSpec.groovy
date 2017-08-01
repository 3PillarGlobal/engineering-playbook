package com.tpg.starter.controller.content

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.test.web.servlet.MockMvc

import static org.hamcrest.Matchers.hasSize
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

class ContentControllerSpec extends com.tpg.starter.controller.content.BaseControllerSpecification {

    @Autowired
    private MockMvc mockMvc

    def 'getDocuments returns the expected number of elements'() {

        when:
        def response = mockMvc.perform(get('/api/documents'))

        then:
        response.andExpect(status().isOk())
                .andExpect(jsonPath('$', hasSize(2)))

    }

}