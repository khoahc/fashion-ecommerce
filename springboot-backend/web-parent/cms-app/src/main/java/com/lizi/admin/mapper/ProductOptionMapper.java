package com.lizi.admin.mapper;

import com.lizi.admin.dto.product.ProductOptionResDto;
import com.lizi.common.entity.ProductImageColor;
import com.lizi.common.entity.ProductOption;
import java.util.HashSet;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductOptionMapper {

  ProductOptionMapper INSTANCE = Mappers.getMapper(ProductOptionMapper.class);

  @Mapping(source = "id", target = "id")
  @Mapping(source = "size", target = "size")
  @Mapping(source = "quantity", target = "quantity")
  @Mapping(source = "productColor.color", target = "color")
  @Mapping(source = "productColor.mainImage.url", target = "mainImage")
  @Mapping(source = "productColor.productImageColors", target = "images", qualifiedByName = "imagesToUrlImage")
  @Mapping(source = "createTime", target = "createTime")
  @Mapping(source = "updateTime", target = "updateTime")
  ProductOptionResDto toDto(ProductOption productOption);

  Set<ProductOptionResDto> toDtos(Set<ProductOption> productOptions);

  @Named("imagesToUrlImage")
  public static Set<String> imagesToUrlImage(Set<ProductImageColor> productImageColors) {
    if (productImageColors == null) {
      return new HashSet<>();
    }
    return productImageColors.stream().map(productImage -> productImage.getImage().getUrl())
        .collect(Collectors.toSet());
  }

}
