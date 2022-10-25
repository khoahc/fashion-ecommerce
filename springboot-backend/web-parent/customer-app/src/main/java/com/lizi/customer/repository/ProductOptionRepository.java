package com.lizi.customer.repository;


import com.lizi.common.entity.ProductOption;
import com.lizi.customer.dto.response.ProductCartResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ProductOptionRepository extends JpaRepository<ProductOption, Long> {

  @Query(value = "select new com.lizi.customer.dto.response.ProductCartResponseDTO(p.name, p.slug, img.url, po.size, c.name, c.slug, p.price, po.quantity) " +
          "from ProductOption po\n" +
          "inner join ProductColor pc\n" +
          "\ton po.productColor.id = pc.id\n" +
          "inner join Product p\n" +
          "\ton p.id = po.product.id\n" +
          "inner join Color c\n" +
          "\ton pc.color.id = c.id\n" +
          "inner join Image img\n" +
          "\ton pc.mainImage.id = img.id\n" +
          "where p.enabled = true")
  Optional<Set<ProductCartResponseDTO>> findAllProductOptionForCart();

}
