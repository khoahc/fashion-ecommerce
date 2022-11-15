package com.lizi.admin.mapper;

import com.lizi.admin.dto.product.ProductColorReqDto;
import com.lizi.common.entity.ProductImageColor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductImageColorMapper {
  ProductImageColorMapper INSTANCE = Mappers.getMapper(ProductImageColorMapper.class);

  ProductImageColor toEntity(ProductColorReqDto dto);
}
