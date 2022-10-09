package com.lizi.customer.service;

import com.lizi.customer.dto.response.CategoryResponseDTO;

public interface CategoryService {
  CategoryResponseDTO getCategoryBySlug(String slug);
}
