package com.lizi.customer.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCatalogResponseDTO {
  private String name;
  private String slugProduct;
  private String slugCategory;

  private List<SlugCategoryResponseDTO> slugCategories;
  private BigDecimal price;
  private BigDecimal promotionalPrice = null;
  private Optional<List<ProductCatalogColorResponseDTO>> colors;

  public ProductCatalogResponseDTO (String name, String slugProduct, String slugCategory, BigDecimal price) {
    this.name = name;
    this.slugProduct = slugProduct;
    this.slugCategory = slugCategory;
    this.price = price;
  }
}
