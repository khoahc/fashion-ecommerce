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

  @RequestMapping(value = "/catalog/{slug}", method = RequestMethod.GET)
  public ResponseObject getAllProductsByCategorySlug(@PathVariable(name = "slug") String slug) {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", productService.getAllProductsByCategorySlug(slug));
  }

  @RequestMapping(value = "/{slug}")
  public ResponseObject getProductDetailByProductSlug(@PathVariable(name = "slug") String slugProduct,
                                                      @RequestParam(name = "color", required = false, defaultValue = "") String slugColor,
                                                      @RequestParam(name = "size", required = false, defaultValue = "") String size) {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", productService.getProductDetailBySlug(slugProduct, slugColor, size));
  }

  @RequestMapping(value = "/top-selling-products")
  public ResponseObject getTopSellingProducts() {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", productService.getTopSellingProducts());
  }

  @RequestMapping(value = "/top-new-products")
  public ResponseObject getTopNewProducts() {
    return new ResponseObject<>(HttpStatus.OK, "Thành công", productService.getTopNewProducts());
  }

}
