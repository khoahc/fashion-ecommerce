package com.lizi.admin.controller;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.service.CategoryService;
import com.lizi.admin.service.CloudinaryService;
import com.lizi.admin.util.Constant;
import com.lizi.admin.util.Util;
import com.lizi.common.entity.ResponseObject;
import com.lizi.common.entity.ResponsePaginationObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(value = "/api/v1/categories")
@CrossOrigin(origins = "*")
public class CategoryController {

  @Autowired
  private CategoryService categoryService;

  @Autowired
  private CloudinaryService cloudinaryService;

  @GetMapping(value = "")
  public ResponseEntity<?> getAll(
      @RequestParam(name = "page", required = false, defaultValue = Constant.PAGE_DEFAULT) int page,
      @RequestParam(name = "size", required = false, defaultValue = Constant.SIZE_DEFAULT) int size,
      @RequestParam(name = "isAll", required = false, defaultValue = "false") boolean isAll) {
    if (isAll) {
      return ResponseEntity.ok().body(
          ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
              .data(categoryService.getAll()).build());
    }

    Sort sort = Sort.by(Direction.DESC, "createTime");
    Pageable pageable = PageRequest.of(page - 1, size, sort);
    return ResponseEntity.ok().body(
        ResponsePaginationObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.getAll(pageable))
            .totalCount(categoryService.getTotalCount(pageable)).build());
  }

  @GetMapping(value = "/level-3")
  public ResponseEntity<ResponseObject> getAllLevel3Category() {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.getAllLevel3Category()).build());
  }

  @GetMapping(value = "/level-1-2")
  public ResponseEntity<ResponseObject> getAllLevel1And2Category() {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.getAllLevel1And2Category()).build());
  }

  @GetMapping(value = "/level/{level}")
  public ResponseEntity<ResponseObject> getCategoryByLevel(
      @PathVariable(name = "level") Integer level,
      @RequestParam(name = "id", required = false) Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.getByLevel(level)).build());
  }

  @GetMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> getCategory(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.getCategory(id)).build());
  }

  @GetMapping(value = "/{id}/children")
  public ResponseEntity<ResponseObject> getAllCategoryChildren(@PathVariable(name = "id") Long id) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.getChildren(id)).build());
  }

  @PostMapping(value = "")
  public ResponseEntity<ResponseObject> createCategory(@RequestBody CategoryReqDto categoryReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.createCategory(categoryReqDto)).build());
  }

  @PutMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> updateCategory(@PathVariable(name = "id") Long id,
      @RequestBody CategoryReqDto categoryReqDto) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS)
            .data(categoryService.updateCategory(id, categoryReqDto)).build());
  }

  @DeleteMapping(value = "/{id}")
  public ResponseEntity<ResponseObject> deleteCategory(@PathVariable(name = "id") Long id) {
    categoryService.deleteCategory(id);
    return ResponseEntity.ok()
        .body(ResponseObject.builder().status(HttpStatus.OK).message(Constant.SUCCESS).build());
  }

  @PostMapping(value = "/image")
  public ResponseEntity<ResponseObject> uploadImageCategory(
      @RequestParam(name = "image") MultipartFile multipartFile) {
    return ResponseEntity.ok().body(
        ResponseObject.builder().message(Constant.SUCCESS).status(HttpStatus.OK)
            .data(cloudinaryService.uploadImageCategory(multipartFile)).build());
  }

}
