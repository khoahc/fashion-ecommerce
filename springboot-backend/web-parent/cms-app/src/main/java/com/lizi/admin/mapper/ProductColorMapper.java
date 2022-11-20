package com.lizi.admin.mapper;

import com.lizi.admin.dto.product.ProductColorReqDto;
import com.lizi.common.entity.ProductColor;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductColorMapper {
  ProductColorMapper INSTANCE = Mappers.getMapper(ProductColorMapper.class);

  ProductColor toEntity(ProductColorReqDto dto);
}
