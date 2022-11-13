package com.lizi.admin.mapper;

import org.mapstruct.Mapper;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ProductOptionMapper {

  ProductOptionMapper INSTANCE = Mappers.getMapper(ProductOptionMapper.class);
  

}
