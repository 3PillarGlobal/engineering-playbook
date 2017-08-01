package com.tpg.starter.security;


import com.tpg.starter.controller.login.UserProfileDto;
import com.tpg.starter.domain.User;
import com.tpg.starter.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.function.Function;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserRepository userRepository;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        User user = userRepository.findByUsername(name);

        if (user != null && user.getPassword().equals(password)) {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
            UserProfileDto userProfileDto = userToUserProfileDto().apply(user);
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

    private Function<User, UserProfileDto> userToUserProfileDto() {
        return user -> {
            UserProfileDto userProfileDto = new UserProfileDto();
            userProfileDto.setUsername(user.getUsername());
            userProfileDto.setFirstName(user.getFirstName());
            userProfileDto.setLastName(user.getLastName());
            return userProfileDto;
        };
    }
}