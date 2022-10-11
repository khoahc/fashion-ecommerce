package com.lizi.customer.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductDetailResponseDTO {
  private String name;
  private String slug;
  private BigDecimal price;
  private BigDecimal promotionalPrice = null;
  private String mainImage;
  private Optional<List<ImageResponseDTO>> images;
  private Optional<List<SizeResponseDTO>> colors;
  private String description;
  private Double rate;

  public ProductDetailResponseDTO(String name, String slug, BigDecimal price, String description) {
    this.name = name;
    this.slug = slug;
    this.price = price;
    this.description = description;
    this.rate = rate;
  }
}
