package com.lizi.customer.exception;

import com.lizi.customer.dto.response.ResponseObject;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = { RuntimeException.class })
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  protected ResponseObject handleException(RuntimeException e) {
    return ResponseObject.builder().status(HttpStatus.BAD_REQUEST).message(e.getMessage()).build();
  }

  @ExceptionHandler(ResourceNotFoundException.class)
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  protected ResponseObject handlerResourceNotFoundException(
          RuntimeException e) {
    return ResponseObject.builder().status(HttpStatus.NOT_FOUND).message(e.getMessage()).build();
  }
}
