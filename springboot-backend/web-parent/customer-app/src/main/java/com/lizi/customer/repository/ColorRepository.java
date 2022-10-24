package com.lizi.customer.repository;

import com.lizi.common.entity.Color;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.parameters.P;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.Set;

@Repository
public interface ColorRepository extends JpaRepository<Color, Long> {

  @Query(value = "SELECT color FROM Category c \n" +
          "\tINNER JOIN Product p\n"+
          "\tON p.category.id = c.id\n"+
          "\tINNER JOIN ProductOption p_o\n"+
          "\tON p.id = p_o.product.id\n"+
          "\tINNER JOIN ProductColor p_c\n" +
          "\tON p_o.productColor.id = p_c.id\n" +
          "\tINNER JOIN Color color\n" +
          "\tON p_c.color.id = color.id\n" +
          "WHERE (c.allParentIds LIKE CONCAT('%', :idCategory ,'%'))\n" +
          " OR c.slug = :slugCategory")
  Optional<Set<Color>> findAllColorsBySlugCategory(@Param(value = "slugCategory") String slug, @Param(value = "idCategory") Integer idCategory);
}
