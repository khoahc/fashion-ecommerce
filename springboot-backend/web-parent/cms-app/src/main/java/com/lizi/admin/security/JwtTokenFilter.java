package com.lizi.admin.security;

import java.io.IOException;
import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

@Component
public class JwtTokenFilter extends OncePerRequestFilter {

  @Autowired
  private JwtTokenUtil jwtUtil;

  @Autowired
  private UserDetailsService userDetailsService;

  private static final Logger LOGGER = LoggerFactory.getLogger(JwtTokenUtil.class);

  @Override
  protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
      throws ServletException, IOException {
    //If the Authorization header of the request doesn’t contain a Bearer token,
    //it continues the filter chain without updating authentication context.
    if (!hasAuthorizationBearer(request)) {
      filterChain.doFilter(request, response);
      return;
    }

    //Else, if the token is not verified, continue the filter chain without updating authentication context.
    String token = getAccessToken(request);
    if (!jwtUtil.validateAccessToken(token)) {
      filterChain.doFilter(request, response);
      return;
    }

    //If the token is verified, update the authentication context with the user details ID and email.
    //In other words, it tells Spring that the user is authenticated, and continue the downstream filters.
    setAuthenticationContext(token, request);
    filterChain.doFilter(request, response);
  }

  private boolean hasAuthorizationBearer(HttpServletRequest request) {
    String header = request.getHeader("Authorization");
    if (ObjectUtils.isEmpty(header) || !header.startsWith("Bearer")) {
      return false;
    }

    return true;
  }

  private String getAccessToken(HttpServletRequest request) {
    String token = null;
    try {
      String header = request.getHeader("Authorization");
      token = header.split(" ")[1].trim();
    } catch(ArrayIndexOutOfBoundsException ex){
      LOGGER.error("Bearer is null", ex.getMessage());
    }
    return token;
  }

  private void setAuthenticationContext(String token, HttpServletRequest request) {
    UserDetails userDetails = getUserDetails(token);

    UsernamePasswordAuthenticationToken authentication =
        new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());

    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

    SecurityContextHolder.getContext().setAuthentication(authentication);
  }

  private UserDetails getUserDetails(String token) {
    String[] jwtSubject = jwtUtil.getSubject(token).split(",");

    return userDetailsService.loadUserByUsername(jwtSubject[1]);
  }
}
