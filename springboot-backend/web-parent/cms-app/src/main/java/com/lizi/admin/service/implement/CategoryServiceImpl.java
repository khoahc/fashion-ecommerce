package com.lizi.admin.service.implement;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.category.CategoryResDto;
import com.lizi.admin.mapper.CategoryMapper;
import com.lizi.admin.repository.CategoryRepository;
import com.lizi.admin.repository.ImageRepository;
import com.lizi.admin.service.CategoryService;
import com.lizi.common.entity.Category;
import com.lizi.common.entity.Image;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class CategoryServiceImpl implements CategoryService {

  @Autowired
  private CategoryRepository categoryRepo;

  @Autowired
  private ImageRepository imageRepo;

  @Override
  public List<CategoryResDto> getAll() {
    return CategoryMapper.INSTANCE.categoriesToDtos(categoryRepo.findAll());
  }

  @Override
  public CategoryResDto getCategory(Long id) {
    return CategoryMapper.INSTANCE.categoryToDto(categoryRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("category", "id", id)));
  }

  @Override
  public CategoryResDto createCategory(CategoryReqDto categoryReqDto) {
    Image image = null;
    if (categoryReqDto.getImageId() != null) {
      image = imageRepo.findById(categoryReqDto.getImageId()).orElseThrow(
          () -> new ResourceNotFoundException("image", "id", categoryReqDto.getImageId()));
    }

    Category parent = null;
    if (categoryReqDto.getParentId() != null) {
      parent = categoryRepo.findById(categoryReqDto.getParentId()).orElseThrow(
          () -> new ResourceNotFoundException("category parent", "id",
              categoryReqDto.getParentId()));
    }

    Category newCategory = CategoryMapper.INSTANCE.dtoToCategory(categoryReqDto);
    newCategory.setImage(image);
    newCategory.setParent(parent);

    return CategoryMapper.INSTANCE.categoryToDto(categoryRepo.save(newCategory));
  }

  @Override
  public CategoryResDto updateCategory(Long id, CategoryReqDto categoryReqDto) {
    Image image = null;
    if (categoryReqDto.getImageId() != null) {
      image = imageRepo.findById(categoryReqDto.getImageId()).orElseThrow(
          () -> new ResourceNotFoundException("image", "id", categoryReqDto.getImageId()));
    }

    Category parent = null;
    if (categoryReqDto.getParentId() != null) {
      parent = categoryRepo.findById(categoryReqDto.getParentId()).orElseThrow(
          () -> new ResourceNotFoundException("category parent", "id",
              categoryReqDto.getParentId()));
    }

    Category category = categoryRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("category", "id", id));

    category.setName(categoryReqDto.getName());
    category.setImage(image);
    category.setParent(parent);
    category.setEnabled(categoryReqDto.isEnabled());

    return CategoryMapper.INSTANCE.categoryToDto(categoryRepo.save(category));
  }

  @Override
  public void deleteCategory(Long id) {
    categoryRepo.deleteById(id);
  }
}
