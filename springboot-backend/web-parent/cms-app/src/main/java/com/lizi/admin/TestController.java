/**
 * 
 */
package com.lizi;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * @author Dang Khoa
 * Sep 1, 2022
 */
@RestController
public class TestController {
  @GetMapping("")
  public ResponseEntity<String> view() {
    return ResponseEntity.ok("springBoot-backend admin");
  }
}
