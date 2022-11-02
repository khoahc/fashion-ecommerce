/**
 * 
 */
package com.lizi.customer.mapper;

import com.lizi.common.entity.Order;
import com.lizi.customer.dto.request.OrderRequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

import java.util.Date;

/**
 * @author Dang Khoa Aug 1, 2022
 */

@Mapper(componentModel = "spring")
public interface OrderMapper {
	OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

	@Mapping(target = "receiverName", source = "dto.fullName")
	@Mapping(target = "phoneNumber", source = "dto.phoneNumber")
	@Mapping(target = "email", source = "dto.email")
	@Mapping(target = "shipCost", source = "dto.shipCost")
	@Mapping(target = "totalPrice", source = "dto.totalPrice")
	@Mapping(target = "address", expression = "java(dto.getAddress() + \", \" + dto.getWard() + \", \" + dto.getDistrict() + \", \" + dto.getProvince())")
//	@Mapping(target = "orderTime", expression = "java(new java.util.Date())")
//	@Mapping(target = "image", source = "dto.image.url")
	Order orderRequestDTOToOrder(OrderRequestDTO dto);

}
