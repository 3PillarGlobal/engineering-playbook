package com.threepillarglobal.spring.boot.boilerplate.service.repository;

import com.threepillarglobal.spring.boot.boilerplate.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {

    User findByUsername(String username);

}