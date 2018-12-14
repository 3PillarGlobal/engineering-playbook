package com.tpg.starter;

import graphql.servlet.GraphQLServlet;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@RestController
@ActiveProfiles("test")
public class GraphQlTestController {

    @Autowired
    private GraphQLServlet graphQLServlet;

    @RequestMapping("graphql")
    public void graphql(HttpServletRequest request, HttpServletResponse response) throws Exception {
        graphQLServlet.service(request, response);
    }
}
