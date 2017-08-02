package com.tpg.starter.service;

import com.tpg.starter.controller.content.RoleDto;
import com.tpg.starter.controller.content.UserDto;
import com.tpg.starter.domain.User;
import com.tpg.starter.service.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Transactional(readOnly = true)
    public Optional<UserDto> findByUsername(String username) {
        Optional<User> user = userRepository.findByUsername(username);
        return user.map(new UserToUserDto());
    }

    private static class UserToUserDto implements Function<User, UserDto> {

        @Override
        public UserDto apply(User user) {
            UserDto userDto = new UserDto();
            userDto.setId(user.getId());
            userDto.setUsername(user.getUsername());
            userDto.setFirstName(user.getFirstName());
            userDto.setLastName(user.getLastName());
            userDto.setPassword(user.getPassword());
            userDto.setRoles(user.getRoles().stream().map( role -> new RoleDto(role.getId(), role.getName())).collect(Collectors.toList()));
            return userDto;
        }
    }

}
