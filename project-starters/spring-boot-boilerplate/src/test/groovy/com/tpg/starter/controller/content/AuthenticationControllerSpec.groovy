package com.tpg.starter.controller.content

import com.tpg.starter.security.WithMockUser
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.test.context.ActiveProfiles
import org.springframework.test.web.servlet.MockMvc
import spock.lang.Specification

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
@ActiveProfiles("testEnabledSecurity")
class AuthenticationControllerSpec extends Specification {

    @Autowired
    private MockMvc mockMvc

    @WithMockUser
    "/api/logout should return 200 OK"() {

        when:
        def logoutResponse = mockMvc.perform(post("/api/logout"))

        then:
        logoutResponse.andExpect(status().isOk())

    }

}
