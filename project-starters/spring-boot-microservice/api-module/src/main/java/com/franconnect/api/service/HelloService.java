package com.franconnect.api.service;

import com.franconnect.api.model.User;
import com.franconnect.api.repository.HelloRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class HelloService {

  @Autowired
  private HelloRepository repo;

  public User getUser() {
    return repo.getUser();
  }
}
