package com.lizi.admin.mapper;

import com.lizi.admin.dto.product.ProductReqDto;
import com.lizi.admin.dto.product.ProductResDto;
import com.lizi.common.entity.Product;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductMapper {

  ProductMapper INSTANCE = Mappers.getMapper(ProductMapper.class);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "image.url", target = "image")
  ProductResDto productToDto(Product product);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "image.url", target = "image")
  List<ProductResDto> productsToDtos(List<Product> product);

  @Mapping(source = "enabled", target = "enabled")
  Product dtoToProduct(ProductReqDto productReqDto);
}
