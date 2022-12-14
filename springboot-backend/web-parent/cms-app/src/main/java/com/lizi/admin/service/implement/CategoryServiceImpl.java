package com.lizi.admin.service.implement;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.category.CategoryResDto;
import com.lizi.admin.mapper.CategoryMapper;
import com.lizi.admin.repository.CategoryRepository;
import com.lizi.admin.repository.ImageRepository;
import com.lizi.admin.service.CategoryService;
import com.lizi.admin.util.Util;
import com.lizi.common.entity.Category;
import com.lizi.common.entity.Image;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Set;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
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
  public List<CategoryResDto> getAll(Pageable pageable) {
    return CategoryMapper.INSTANCE.categoriesToDtos(categoryRepo.findAll(pageable).getContent());
  }

  @Override
  public Long getTotalCount(Pageable pageable) {
    return categoryRepo.findAll(pageable).getTotalElements();
  }

  @Override
  public List<CategoryResDto> getAllLevel3Category() {
    return CategoryMapper.INSTANCE.categoriesToDtos(categoryRepo.findAllLevel3());
  }

  @Override
  public List<CategoryResDto> getAllLevel1And2Category() {
    return CategoryMapper.INSTANCE.categoriesToDtos(categoryRepo.findAllLevel1And2());
  }

  @Override
  public List<CategoryResDto> getByLevel(Integer level) {
    if (level == null || level == 1) {
      return CategoryMapper.INSTANCE.categoriesToDtos(categoryRepo.findAllLevel1());
    }
    int lengthAllParentIds = 1 + level * 2;
    return CategoryMapper.INSTANCE.categoriesToDtos(categoryRepo.findAllLevel1());
  }

  @Override
  public List<CategoryResDto> getChildren(Long id) {
    Category categoryParent = get(id);
    return CategoryMapper.INSTANCE.categoriesToDtos(categoryRepo.findChildren(categoryParent));
  }

  @Override
  public CategoryResDto getCategory(Long id) {
    return CategoryMapper.INSTANCE.categoryToDto(categoryRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("category", "id", id)));
  }

  @Override
  public CategoryResDto createCategory(CategoryReqDto categoryReqDto) {
    // get parent category
    Category parent = null;
    if (categoryReqDto.getParentId() != null) {
      parent = categoryRepo.findById(categoryReqDto.getParentId()).orElseThrow(
          () -> new ResourceNotFoundException("category parent", "id",
              categoryReqDto.getParentId()));
    }

    // get image
    Image image = null;
    if (categoryReqDto.getImageUrl() != null) {
      image = imageRepo.findImageByUrl(categoryReqDto.getImageUrl()).orElseThrow(
          () -> new ResourceNotFoundException("image", "url", categoryReqDto.getImageUrl()));
    }

    Category newCategory = CategoryMapper.INSTANCE.dtoToCategory(categoryReqDto);
    newCategory.setImage(image);
    newCategory.setParent(parent);
    newCategory.setSlug(Util.toSlug(newCategory.getName()));
    newCategory.setSlug(generateSlugCategory(newCategory));
    newCategory.setAllParentIds(generateAllParentIds(parent));
    newCategory.setDeleted(false);

    return CategoryMapper.INSTANCE.categoryToDto(categoryRepo.save(newCategory));
  }

  @Override
  public CategoryResDto updateCategory(Long id, CategoryReqDto categoryReqDto) {
    // get category
    Category category = categoryRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("category", "id", id));

    // get parent category
    Category parent = null;
    if (categoryReqDto.getParentId() != null) {
      parent = categoryRepo.findById(categoryReqDto.getParentId()).orElseThrow(
          () -> new ResourceNotFoundException("category parent", "id",
              categoryReqDto.getParentId()));
    }

    // get image
    Image image = null;
    if (categoryReqDto.getImageUrl() != null) {
      image = imageRepo.findImageByUrl(categoryReqDto.getImageUrl()).orElseThrow(
          () -> new ResourceNotFoundException("image", "url", categoryReqDto.getImageUrl()));
    }

    category.setName(categoryReqDto.getName());
    category.setImage(image);
    category.setParent(parent);
    category.setEnabled(categoryReqDto.isEnabled());
    category.setSlug(generateSlugCategory(category));
    category.setAllParentIds(generateAllParentIds(parent));

    return CategoryMapper.INSTANCE.categoryToDto(categoryRepo.save(category));
  }

  @Override
  public void deleteCategory(Long id) {
    Category category = get(id);
    deleteCategory(category);
  }

  @Override
  public void deleteCategory(Category category) {
    category.setDeleted(true);
    categoryRepo.save(category);

    Set<Category> children = category.getChildren();
    children.stream().forEach(c -> deleteCategory(c));
  }

  @Override
  public Category get(Long id) {
    return categoryRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("category", "id", id));
  }

  private String generateAllParentIds(Category parent) {
    if (parent == null) {
      return null;
    }

    StringBuilder builder = new StringBuilder();
    Category temp = parent;
    do {
      builder.append("-").append(temp.getId());
      temp = temp.getParent();
    } while (temp != null);

    return builder.append("-").toString();
  }

  private String generateSlugCategory(Category category) {
    StringBuilder builder = new StringBuilder();
    builder.append(Util.toSlug(category.getName()));

    Category temp = category.getParent();
    while (temp != null) {
      builder.append("--").append(temp.getSlug());
      temp = temp.getParent();
    }

    return builder.toString();
  }
}
