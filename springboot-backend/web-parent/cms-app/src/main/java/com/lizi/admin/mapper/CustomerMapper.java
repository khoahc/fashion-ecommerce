package com.lizi.admin.mapper;

import com.lizi.admin.dto.category.CategoryResDto;
import com.lizi.admin.dto.customer.CustomerResDto;
import com.lizi.common.entity.Category;
import com.lizi.common.entity.Customer;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface CustomerMapper {

  CustomerMapper INSTANCE = Mappers.getMapper(CustomerMapper.class);

//  @Mapping(source = "enabled", target = "enabled")
//  @Mapping(source = "image.url", target = "image")
//  @Mapping(source = "parent", target = "parent")
//  @Mapping(source = "createTime", target = "createTime")
//  @Mapping(source = "updateTime", target = "updateTime")
  CustomerResDto categoryToDto(Customer customer);

  List<CustomerResDto> categoriesToDtos(List<Customer> customers);

}
