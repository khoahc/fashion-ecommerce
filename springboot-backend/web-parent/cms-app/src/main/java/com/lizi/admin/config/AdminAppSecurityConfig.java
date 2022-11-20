package com.lizi.admin.config;

import com.lizi.admin.security.JwtTokenFilter;
import com.lizi.admin.util.MapHelper;
import com.lizi.common.entity.ResponseObject;
import java.util.Map;
import javax.servlet.http.HttpServletResponse;
import org.cloudinary.json.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true, jsr250Enabled = true, prePostEnabled = true)
public class AdminAppSecurityConfig {

  @Bean
  public PasswordEncoder passwordEncoder() {
    return new BCryptPasswordEncoder();
  }

  @Autowired
  private JwtTokenFilter jwtTokenFilter;

  @Bean
  AuthenticationManager authenticationManager(AuthenticationConfiguration authConfig)
      throws Exception {
    return authConfig.getAuthenticationManager();
  }

  @Bean
  SecurityFilterChain configure(HttpSecurity http) throws Exception {
    http.csrf().disable();
    http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);

    http.authorizeRequests()
        .antMatchers("/auth/login", "/docs/**", "/swagger-ui/index.html#/")
        .permitAll()
        .anyRequest()
        .permitAll();

    // Exception handling configuration
    http.exceptionHandling()
        .accessDeniedHandler(
            (request, response, ex) -> {
              response.setContentType(MediaType.APPLICATION_JSON_VALUE);
              response.setStatus(HttpServletResponse.SC_OK);

              ResponseObject responseObject = ResponseObject.builder()
                  .status(HttpStatus.UNAUTHORIZED).message(ex.getMessage()).build();
              Map<String, Object> map = MapHelper.convertObject(responseObject);

              response.getWriter().write(new JSONObject(map).toString());
            });

    http.exceptionHandling()
        .authenticationEntryPoint(
            (request, response, ex) -> {
              response.setContentType(MediaType.APPLICATION_JSON_VALUE);
              response.setStatus(HttpServletResponse.SC_OK);

              ResponseObject responseObject = ResponseObject.builder()
                  .status(HttpStatus.UNAUTHORIZED).message(ex.getMessage()).build();
              Map<String, Object> map = MapHelper.convertObject(responseObject);

              response.getWriter().write(new JSONObject(map).toString());
            });

    http.addFilterBefore(jwtTokenFilter, UsernamePasswordAuthenticationFilter.class);

    return http.build();
  }
}
