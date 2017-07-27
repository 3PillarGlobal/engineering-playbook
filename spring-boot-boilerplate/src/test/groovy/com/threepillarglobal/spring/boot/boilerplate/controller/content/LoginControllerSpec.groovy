package com.threepillarglobal.spring.boot.boilerplate.controller.content

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc
import org.springframework.boot.test.context.SpringBootTest
import org.springframework.http.HttpHeaders
import org.springframework.test.web.servlet.MockMvc
import org.springframework.util.Base64Utils
import spock.lang.Specification

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status

@SpringBootTest(webEnvironment = RANDOM_PORT)
@AutoConfigureMockMvc
class LoginControllerSpec extends Specification {

    @Autowired
    private MockMvc mockMvc

    def 'login with valid credentials should return user details'() {

        when:
        def response = mockMvc.perform(get('/api/login').header(HttpHeaders.AUTHORIZATION,
                'Basic ' + Base64Utils.encodeToString('admin_admin:secret'.getBytes())))

        then:
        response.andExpect(status().isOk())
                .andExpect(jsonPath('$.username').value('admin'))

    }

    def 'login with bad credentials should return unauthorized response'() {

        when:
        def response = mockMvc.perform(get('/api/login')
                .header(HttpHeaders.AUTHORIZATION, 'Basic ' + Base64Utils.encodeToString('admin2:secret'.getBytes())))

        then:
        response.andExpect(status().isUnauthorized())

    }

    def 'accessing protected resources using x-auth-token obtained during login should work'() {

        when: 'trying to access a protected resource'
        def response = mockMvc.perform(get('/api/documents'))

        then: 'response is unauthorized'
        response.andExpect(status().isUnauthorized())

        when: 'logging in with valid credentials '
        def loginResponse = mockMvc.perform(get('/api/login')
                .header(HttpHeaders.AUTHORIZATION, 'Basic ' + Base64Utils.encodeToString('admin_admin:secret'.getBytes())))
                .andReturn()
                .getResponse()
        def authenticationToken = loginResponse.getHeader('x-auth-token')

        then: 'x-auth-token is present in the response'
        authenticationToken != null

        when: 'accessing a protected resource with x-auth-token obtained during login '
        def documentsResponse = mockMvc.perform(get('/api/documents').header('x-auth-token', authenticationToken))

        then: 'response is OK'
        documentsResponse.andExpect(status().isOk())

    }

}