package com.lizi.admin.exception;

import com.lizi.common.entity.ResponseObject;
import com.lizi.common.exception.ResourceNotFoundException;
import io.jsonwebtoken.ExpiredJwtException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import org.hibernate.exception.ConstraintViolationException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

  @ExceptionHandler(value = {ConstraintViolationException.class})
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  protected ResponseObject handleConstraintViolationException(ConstraintViolationException e) {
    return ResponseObject.builder().status(HttpStatus.BAD_REQUEST).message(e.getMessage()).build();
  }

  @ExceptionHandler(value = {ExpiredJwtException.class})
  @ResponseStatus(HttpStatus.UNAUTHORIZED)
  @ResponseBody
  protected ResponseObject handleExpiredJwtException(ExpiredJwtException e) {
    return ResponseObject.builder().status(HttpStatus.UNAUTHORIZED).message(e.getMessage()).build();
  }

  @ExceptionHandler(value = {RuntimeException.class})
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  protected ResponseObject handleException(RuntimeException e) {
    e.printStackTrace();
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
