package com.lizi.customer.repository;

import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderDetail;
import com.lizi.customer.dto.response.ProductCartResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface OrderDetailRepository extends JpaRepository<OrderDetail, Long> {

  @Query(value = "SELECT new com.lizi.customer.dto.response.ProductCartResponseDTO(p.name, p.slug, i.url, p_o.size, " +
          "c.name, c.slug, p_o.product.price, o_d.quantity) " +
          "FROM OrderDetail o_d\n" +
          "INNER JOIN o_d.productOption p_o \n" +
          "INNER JOIN p_o.product p \n" +
          "on p_o.product.id = p.id\n" +
          "INNER JOIN ProductColor p_c \n" +
          "on p_o.productColor.id = p_c.id\n" +
          "INNER JOIN Color c \n" +
          "on p_c.color.id = c.id\n" +
          "INNER JOIN Image i \n" +
          "on p_c.mainImage.id = i.id\n" +
          "where o_d.order.id = :orderId")
  List<ProductCartResponseDTO> findAllProductOptionByOrderId(@Param(value = "orderId") String id);


  @Query(value = "SELECT o_d FROM OrderDetail o_d \n" +
          "\tWHERE o_d.productOption.product.slug = :productSlug and o_d.order.email = :email")
  List<OrderDetail> findByProductSlugAndEmail(String productSlug, String email);
}
