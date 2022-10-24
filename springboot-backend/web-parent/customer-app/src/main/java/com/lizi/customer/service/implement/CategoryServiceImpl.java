package com.lizi.customer.service.implement;

import com.lizi.common.entity.Category;
import com.lizi.customer.dto.response.CategoryResponseDTO;
import com.lizi.customer.exception.ResourceNotFoundException;
import com.lizi.customer.mapper.CategoryMapper;
import com.lizi.customer.repository.CategoryRepository;
import com.lizi.customer.service.CategoryService;
import org.mapstruct.factory.Mappers;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {
  private final CategoryMapper mapper =
          Mappers.getMapper(CategoryMapper.class);
  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public CategoryResponseDTO getCategoryBySlug(String slug) {
    CategoryResponseDTO categoryResponseDTO = mapper.categoryToCategoryResponseDTO(categoryRepository.findBySlugAndEnabledTrue(slug).orElseThrow(
            () -> new ResourceNotFoundException("Could not find any category with slug: " + slug)
    ));
    return categoryResponseDTO;
  }

  @Override
  public List<CategoryResponseDTO> getMenuCategoryBySlug(String slug) {
    List<Category> menuCategory = categoryRepository.findMenuCategoryBySlug(slug);

    List<CategoryResponseDTO> menuCategoryResponseDTO = new ArrayList<CategoryResponseDTO>();

    menuCategory.forEach(item -> {
      menuCategoryResponseDTO.add(mapper.categoryToCategoryResponseDTO(item));
    });

    return menuCategoryResponseDTO;
  }
}
