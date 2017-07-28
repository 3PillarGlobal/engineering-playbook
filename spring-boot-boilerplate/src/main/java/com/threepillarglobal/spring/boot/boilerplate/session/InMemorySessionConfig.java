package com.threepillarglobal.spring.boot.boilerplate.session;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Profile;
import org.springframework.session.MapSessionRepository;
import org.springframework.session.config.annotation.web.http.EnableSpringHttpSession;

@EnableSpringHttpSession
@Profile({"local", "test"})
public class InMemorySessionConfig {

    @Bean
    public MapSessionRepository sessionRepository() {
        return new MapSessionRepository();
    }

}