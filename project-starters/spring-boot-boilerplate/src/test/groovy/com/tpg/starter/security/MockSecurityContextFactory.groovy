package com.tpg.starter.security

import com.tpg.starter.controller.login.UserProfileDto
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken
import org.springframework.security.core.Authentication
import org.springframework.security.core.context.SecurityContext
import org.springframework.security.core.context.SecurityContextHolder
import org.springframework.security.test.context.support.WithSecurityContextFactory


class MockSecurityContextFactory implements WithSecurityContextFactory<WithMockUser> {

    @Override
    SecurityContext createSecurityContext(WithMockUser user) {

        List<String> roles = (user.roles() != null) ? Arrays.asList(user.roles()) : new ArrayList<>()

        UserProfileDto userProfileDto = new UserProfileDto()
        userProfileDto.setUsername(user.username())
        userProfileDto.setFirstName(user.firstName())
        userProfileDto.setLastName(user.lastName())
        userProfileDto.setRoles(roles)

        Authentication auth = new UsernamePasswordAuthenticationToken(user.username(), null, new ArrayList<>())
        auth.setDetails(userProfileDto)

        def context = SecurityContextHolder.createEmptyContext()
        context.setAuthentication(auth)

        return context
    }

}