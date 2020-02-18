package com.franconnect.api.controller;

import com.franconnect.api.model.User;
import com.franconnect.api.service.HelloService;
import io.swagger.annotations.ApiOperation;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HelloWorldController {

  Logger logger = LoggerFactory.getLogger(HelloWorldController.class);

  @Autowired
  private HelloService service;

  @GetMapping(value = "/hello")
  @ApiOperation(value = "This is my documentation")
  public ResponseEntity<User> hello() {
    logger.info("Entering the hello method");
    return new ResponseEntity<User>(service.getUser(), HttpStatus.OK);
  }
}
