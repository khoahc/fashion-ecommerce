package com.lizi.admin.exception;

import com.lizi.common.entity.ResponseObject;
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

  @ExceptionHandler(value = {RuntimeException.class})
  @ResponseStatus(HttpStatus.OK)
  @ResponseBody
  protected ResponseObject handleException(RuntimeException e) {
    return ResponseObject.builder().status(HttpStatus.BAD_REQUEST).message(e.getMessage()).build();
  }

}
