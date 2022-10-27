package com.lizi.admin.mapper;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.category.CategoryResDto;
import com.lizi.common.entity.Category;
import com.lizi.common.entity.Image;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CategoryMapper {

  CategoryMapper INSTANCE = Mappers.getMapper(CategoryMapper.class);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "imageId", target = "image", qualifiedByName = "idImageToImage")
  @Mapping(source = "parentId", target = "parent", qualifiedByName = "idParentToParent")
  Category dtoToCategory(CategoryReqDto categoryReqDto);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "image.url", target = "image")
  @Mapping(source = "parent", target = "parent")
  @Mapping(source = "createTime", target = "createTime")
  @Mapping(source = "updateTime", target = "updateTime")
  CategoryResDto categoryToDto(Category category);

  List<CategoryResDto> categoriesToDtos(List<Category> categories);

  @Named("idImageToImage")
  public static Image idImageToImage(Long id) {
    if (id == null) return null;
    return Image.builder().id(id).build();
  }

  @Named("idParentToParent")
  public static Category idParentToParent(Long id) {
    if (id == null) return null;
    return Category.builder().id(id).build();
  }
}
