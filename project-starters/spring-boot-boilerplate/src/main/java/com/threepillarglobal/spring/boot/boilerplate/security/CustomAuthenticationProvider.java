package com.threepillarglobal.spring.boot.boilerplate.security;

import com.threepillarglobal.spring.boot.boilerplate.controller.login.UserProfileDto;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        if (name.equals("admin_admin")) {
            UserProfileDto userProfileDto = new UserProfileDto();
            userProfileDto.setUsername("admin");
            userProfileDto.setFirstName("Admin");
            userProfileDto.setLastName("Admin");

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
            usernamePasswordAuthenticationToken.setDetails(userProfileDto);
            return usernamePasswordAuthenticationToken;
        } else {
            throw new BadCredentialsException("Invalid credentials");
        }
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }

}