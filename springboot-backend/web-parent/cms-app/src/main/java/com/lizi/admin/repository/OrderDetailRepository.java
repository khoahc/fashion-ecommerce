package com.lizi.admin.repository;

import com.lizi.admin.dto.product.ProductOrderResDto;
import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderDetail;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OrderDetailRepository extends JpaRepository<OrderDetail, String> {
    @Query(value = "SELECT new com.lizi.admin.dto.product.ProductOrderResDto(p.name, img.url, c.name, c.slug, p_o.size, o_d.price, o_d.quantity) FROM OrderDetail o_d " +
            "JOIN o_d.productOption p_o " +
            "JOIN p_o.product p " +
            "JOIN p_o.productColor p_c " +
            "JOIN p_c.color c " +
            "JOIN p_c.mainImage img " +
            "WHERE o_d.order.id = :orderId ")
    List<ProductOrderResDto> findAllProductsByOrderId(@Param(value = "orderId") String orderId);

}
