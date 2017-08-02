package com.tpg.starter.security

import org.springframework.security.test.context.support.WithSecurityContext

import java.lang.annotation.Retention
import java.lang.annotation.RetentionPolicy


@Retention(RetentionPolicy.RUNTIME)
@WithSecurityContext(factory = MockSecurityContextFactory.class)
@interface WithMockUser {

    String username() default "test"

    String firstName() default "John"

    String lastName() default "Doe"

    String[] roles() default ['REGULAR_USER']

}
