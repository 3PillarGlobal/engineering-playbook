package com.tpg.starter.security;


import com.tpg.starter.service.dto.user.RoleDto;
import com.tpg.starter.service.dto.user.UserDto;
import com.tpg.starter.controller.login.UserProfileDto;
import com.tpg.starter.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {

    @Autowired
    private UserService userService;

    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {

        String name = authentication.getName();
        String password = authentication.getCredentials().toString();

        Optional<UserDto> userDto = userService.findByUsername(name);

        if (userDto.isPresent() && userDto.get().getPassword().equals(password)) {
            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(name, password, new ArrayList<>());
            UserProfileDto userProfileDto = userToUserProfileDto().apply(userDto.get());
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

    private Function<UserDto, UserProfileDto> userToUserProfileDto() {
        return userDto -> {
            UserProfileDto userProfileDto = new UserProfileDto();
            userProfileDto.setUsername(userDto.getUsername());
            userProfileDto.setFirstName(userDto.getFirstName());
            userProfileDto.setLastName(userDto.getLastName());
            userProfileDto.setRoles(userDto.getRoles().stream().map(RoleDto::getName).collect(Collectors.toList()));
            return userProfileDto;
        };
    }
}