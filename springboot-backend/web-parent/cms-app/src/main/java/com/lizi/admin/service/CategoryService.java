package com.lizi.admin.service;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.category.CategoryResDto;
import java.util.List;

public interface CategoryService {

  List<CategoryResDto> getAll();
  List<CategoryResDto> getAllLevel3Category();

  CategoryResDto getCategory(Long id);

  CategoryResDto createCategory(CategoryReqDto categoryReqDto);

  CategoryResDto updateCategory(Long id, CategoryReqDto categoryReqDto);

  void deleteCategory(Long id);
}
