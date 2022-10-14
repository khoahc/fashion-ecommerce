package com.lizi.customer.controller;

import com.lizi.customer.dto.response.CategoryResponseDTO;
import com.lizi.customer.dto.response.ResponseObject;
import com.lizi.customer.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = "/api/v1/category")
@CrossOrigin(origins = "http://localhost")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @RequestMapping(value = "/{slug}", method = RequestMethod.GET)
  public ResponseObject getCategoryBySlug(@PathVariable(name = "slug") String slug) {
    return new ResponseObject<>(HttpStatus.OK, "Tìm được loại sản phẩm thành công", categoryService.getCategoryBySlug(slug));
  }

  @RequestMapping(value = "/menu/{slug}", method = RequestMethod.GET)
  public ResponseObject getMenuCategoryBySlug(@PathVariable(name = "slug") String slug) {
    return new ResponseObject<>(HttpStatus.OK, "Tìm được menu thành công", categoryService.getMenuCategoryBySlug(slug));
  }
}
