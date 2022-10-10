package com.lizi.customer.controller;

import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/product")
@CrossOrigin(origins = "http://localhost")
public class ProductController {

  @Autowired
  private ProductService productService;

  @RequestMapping(value = "/c/{slug}", method = RequestMethod.GET)
  public ResponseObject getAllProductsByCategorySlug(@PathVariable(name = "slug") String slug) {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", productService.getAllProductsByCategorySlug(slug));
  }

}
