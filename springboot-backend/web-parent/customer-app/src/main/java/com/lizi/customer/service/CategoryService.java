package com.lizi.customer.service;

import com.lizi.customer.dto.response.CategoryResponseDTO;

import java.util.List;

public interface CategoryService {
  CategoryResponseDTO getCategoryBySlug(String slug);

  List<CategoryResponseDTO> getMenuCategoryBySlug(String slug);
}
