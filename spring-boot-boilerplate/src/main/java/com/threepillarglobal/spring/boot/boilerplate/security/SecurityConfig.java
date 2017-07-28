package com.threepillarglobal.spring.boot.boilerplate.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Profile;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.builders.WebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
import org.springframework.web.filter.CorsFilter;

@Configuration
@Profile(value = "!test")
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    @Value("${allowed.origins}")
    private String allowedOrigins;

    @Autowired
    private CustomAuthenticationProvider authProvider;

    @Autowired
    private RestAuthenticationEntryPoint restAuthenticationEntryPoint;

    @Override
    protected void configure(HttpSecurity http) throws Exception {
        // @formatter:off
        http.cors()
                .and()
                    .authorizeRequests()
                        .anyRequest()
                        .authenticated()
                .and()
                    .httpBasic()
                .and()
                    .exceptionHandling()
                        .authenticationEntryPoint(restAuthenticationEntryPoint)
                .and()
                    .csrf()
                        .disable();
        // @formatter:on
    }

    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.authenticationProvider(authProvider);
    }

    @Bean(name = "corsFilter")
    public CorsFilter corsFilter() {
        CorsConfiguration config = new CorsConfiguration();
        for (String allowedOrigin : allowedOrigins.split(",")) {
            config.addAllowedOrigin(allowedOrigin);
        }
        config.addAllowedHeader("*");
        config.addExposedHeader("x-auth-token");
        config.addAllowedMethod("GET");
        config.addAllowedMethod("POST");
        config.addAllowedMethod("PUT");
        config.addAllowedMethod("DELETE");
        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return new CorsFilter(source);
    }

    @Override
    public void configure(WebSecurity web) throws Exception {
        web.ignoring()
                /* in case swagger is enabled */
                .antMatchers("/v2/api-docs")
                .antMatchers("/swagger-ui.html")
                .antMatchers("/webjars/**")
                .antMatchers("/swagger-resources/**");

    }

}