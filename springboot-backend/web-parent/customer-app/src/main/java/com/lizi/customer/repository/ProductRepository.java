package com.lizi.customer.repository;

import com.lizi.common.entity.Product;
import com.lizi.customer.dto.response.ProductCatalogColorResponseDTO;
import com.lizi.customer.dto.response.ProductCatalogResponseDTO;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ProductRepository extends JpaRepository<Product, Long> {

  //find all product (name, slug and price attribute) by category slug
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductCatalogResponseDTO(p.name, p.slug, p.price) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "INNER JOIN Category c\n" +
          "ON p.category.id = c.id\n" +
          "INNER JOIN ProductOption p_o\n" +
          "ON p.id = p_o.product.id\n" +
          "WHERE c.slug = :slugCategory")
  List<ProductCatalogResponseDTO> findAllProductsCatalogByCategorySlug(@Param("slugCategory") String slug);

  //find colors of product (name, slug and image attribute) by category slug and product slug
  @Query(value = "SELECT DISTINCT new com.lizi.customer.dto.response.ProductCatalogColorResponseDTO(p_c.name, p_c.slug, img.url as main_image) \n" +
          "FROM \n" +
          "\tProduct p \n" +
          "INNER JOIN Category c\n" +
          "ON p.category.id = c.id\n" +
          "INNER JOIN ProductOption p_o\n" +
          "ON p.id = p_o.product.id\n" +
          "INNER JOIN ProductColor p_c\n" +
          "ON p_o.productColor.id = p_c.id\n" +
          "INNER JOIN Image img\n" +
          "ON p_c.mainImage.id = img.id\n" +
          "WHERE c.slug = :slugCategory AND p.slug = :slugProduct")
  List<ProductCatalogColorResponseDTO> findProductCatalogColorByProductSlug(@Param("slugCategory") String slugCategory, @Param("slugProduct") String slugProduct);

}
