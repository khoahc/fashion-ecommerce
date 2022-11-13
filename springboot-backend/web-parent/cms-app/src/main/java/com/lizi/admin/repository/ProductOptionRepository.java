package com.lizi.admin.repository;

import com.lizi.common.entity.ProductOption;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductOptionRepository extends JpaRepository<ProductOption, Long> {

  @Query("SELECT o "
      + "FROM Product p "
      + "INNER JOIN p.options o "
      + "WHERE p.id = :productId")
  List<ProductOption> findAllOfProduct(@Param("productId") Long productId);
}
