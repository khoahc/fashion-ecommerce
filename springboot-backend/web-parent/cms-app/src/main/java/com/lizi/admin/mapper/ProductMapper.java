package com.lizi.admin.mapper;

import com.lizi.admin.dto.category.CategoryResDto;
import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductResDto;
import com.lizi.common.entity.Product;
import com.lizi.common.entity.ProductOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {

  ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(expression = "java(CategoryMapper.INSTANCE.categoryToDto(product.getCategory()))",
      target = "category")
  @Mapping(expression = "java(ProductOptionMapper.INSTANCE.toDtos(product.getOptions()))",
      target = "options")
  @Mapping(source = "options", target = "mainImage", qualifiedByName = "getMainImage")
  ProductResDto productToDto(Product product);

  List<ProductResDto> productsToDtos(List<Product> product);

  @Mapping(source = "name", target = "name")
  @Mapping(source = "description", target = "description")
  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "cost", target = "cost")
  @Mapping(source = "price", target = "price")
  @Mapping(ignore = true, target = "numberOfOrder")
  @Mapping(ignore = true, target = "category")
  @Mapping(ignore = true, target = "slug")
  Product dtoToProduct(ProductReqDto productReqDto);

  @Mapping(ignore = true, target = "id")
  void updateProductFromDto(ProductReqDto productReqDto, @MappingTarget Product product);

  @Named("getMainImage")
  public static String getMainImage(Set<ProductOption> options) {
    List<ProductOption> optionList = new ArrayList<>(options);
    List<ProductOption> optionSortList = optionList.stream().sorted((o1, o2) -> Long.compare(o1.getId(),
        o2.getId())).collect(Collectors.toList());
    return optionSortList.get(0).getProductColor().getMainImage().getUrl();
  }
}
