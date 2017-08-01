package com.tpg.starter.controller.login;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Validated
@RequestMapping("/api")
public class LoginController {

    private static final Logger log = LoggerFactory.getLogger(LoginController.class);

    @RequestMapping(path = "/login", method = RequestMethod.GET)
    public ResponseEntity<UserProfileDto> login(Authentication authentication) {
        log.debug("[login]");
        UserProfileDto userProfileDto = (UserProfileDto) authentication.getDetails();
        return ResponseEntity.ok(userProfileDto);
    }

}