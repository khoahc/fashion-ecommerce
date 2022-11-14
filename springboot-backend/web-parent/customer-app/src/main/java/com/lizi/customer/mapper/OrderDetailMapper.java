/**
 * 
 */
package com.lizi.customer.mapper;

import com.lizi.common.entity.OrderDetail;
import com.lizi.customer.dto.request.ProductCheckoutRequestDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

/**
 * @author Dang Khoa Aug 1, 2022
 */

@Mapper(componentModel = "spring")
public interface OrderDetailMapper {
	OrderDetailMapper INSTANCE = Mappers.getMapper(OrderDetailMapper.class);

	@Mapping(target = "price", source = "dto.price")
	@Mapping(target = "quantity", source = "dto.count")
	OrderDetail productCheckoutRequestDTOToOrderDetail(ProductCheckoutRequestDTO dto);

}
