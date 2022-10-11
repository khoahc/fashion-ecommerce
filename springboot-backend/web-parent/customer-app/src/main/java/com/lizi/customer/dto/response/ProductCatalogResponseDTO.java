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
  private String slug;
  private BigDecimal price;
  private BigDecimal promotionalPrice = null;
  private Optional<List<ProductCatalogColorResponseDTO>> colors;

  public ProductCatalogResponseDTO (String name, String slug, BigDecimal price) {
    this.name = name;
    this.slug = slug;
    this.price = price;
  }
}
