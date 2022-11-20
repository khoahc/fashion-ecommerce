package com.lizi.customer.mapper;

import com.lizi.common.entity.ProductOption;
import com.lizi.customer.dto.response.ProductOptionResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper(componentModel = "spring")
public interface ProductOptionMapper {
  ProductOptionMapper INSTANCE = Mappers.getMapper(ProductOptionMapper.class);

  @Mapping(target = "id" , source = "entity.id")
  @Mapping(target = "size" , source = "entity.size")
  @Mapping(target = "color" , source = "entity.productColor.color.name")
  @Mapping(target = "slugColor" , source = "entity.productColor.color.slug")
  @Mapping(target = "productName" , source = "entity.product.name")
  @Mapping(target = "slugProduct" , source = "entity.product.slug")
  ProductOptionResponseDTO productOptionToProductOptionResponseDTO(ProductOption entity);
}
