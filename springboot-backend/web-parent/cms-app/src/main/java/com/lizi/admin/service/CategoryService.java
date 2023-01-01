package com.lizi.admin.service;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.category.CategoryResDto;
import com.lizi.common.entity.Category;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface CategoryService {

  List<CategoryResDto> getAll();
  List<CategoryResDto> getAll(Pageable pageable);
  Long getTotalCount(Pageable pageable);
  List<CategoryResDto> getAllLevel3Category();
  List<CategoryResDto> getAllLevel1And2Category();
  List<CategoryResDto> getByLevel(Integer level);
  List<CategoryResDto> getChildren(Long id);

  CategoryResDto getCategory(Long id);

  CategoryResDto createCategory(CategoryReqDto categoryReqDto);

  CategoryResDto updateCategory(Long id, CategoryReqDto categoryReqDto);

  void deleteCategory(Long id);

  Category get(Long id);
}
