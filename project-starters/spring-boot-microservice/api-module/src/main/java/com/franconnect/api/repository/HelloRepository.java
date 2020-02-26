package com.franconnect.api.repository;

import com.franconnect.api.model.User;
import org.springframework.stereotype.Repository;

@Repository
public class HelloRepository {


  public User getUser() {
    return new User("Username", "test@username.com");
  }
}
