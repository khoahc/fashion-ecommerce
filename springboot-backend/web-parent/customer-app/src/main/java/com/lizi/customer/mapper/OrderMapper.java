/**
 * 
 */
package com.lizi.customer.mapper;

import com.lizi.common.entity.Order;
import com.lizi.common.entity.PaymentMethod;
import com.lizi.customer.dto.request.OrderRequestDTO;
import com.lizi.customer.exception.ResourceNotFoundException;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

/**
 * @author Dang Khoa Aug 1, 2022
 */

@Mapper(componentModel = "spring")
public interface OrderMapper {
	OrderMapper INSTANCE = Mappers.getMapper(OrderMapper.class);

	@Mapping(target = "receiverName", source = "dto.fullName")
	@Mapping(target = "phoneNumber", source = "dto.phoneNumber")
	@Mapping(target = "email", source = "dto.email")
	@Mapping(target = "paymentMethod", source = "dto.paymentMethod", qualifiedByName = "paymentMethodDTOtoPaymentMethod")
	@Mapping(target = "shipCost", source = "dto.shipCost")
	@Mapping(target = "totalPrice", source = "dto.totalPrice")
	@Mapping(target = "address", expression = "java(dto.getAddress() + \", \" + dto.getWard() + \", \" + dto.getDistrict() + \", \" + dto.getProvince())")
	Order orderRequestDTOToOrder(OrderRequestDTO dto);

	@Named("paymentMethodDTOtoPaymentMethod")
	public static PaymentMethod paymentMethodDTOtoPaymentMethod(String paymentMethod) {
		if(paymentMethod.equals("cod")) {
			return PaymentMethod.PAYMENT_ON_DELIVERY;
		} else {
			throw new ResourceNotFoundException("Không có phương thức thanh toán này");
		}
	}

}
