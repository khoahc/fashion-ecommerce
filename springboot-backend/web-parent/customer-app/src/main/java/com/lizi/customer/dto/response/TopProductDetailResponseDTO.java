package com.lizi.customer.dto.response;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class TopProductDetailResponseDTO {
  private String name;
  private String slug;
  private double rate;
  private BigDecimal price;
  private BigDecimal promotionalPrice;
  private List<ColorProductDetailResponseDTO> colors;

  public TopProductDetailResponseDTO(String name, String slug, double rate, BigDecimal price, BigDecimal promotionalPrice) {
    this.name = name;
    this.slug = slug;
    this.rate = rate;
    this.price = price;
    this.promotionalPrice = promotionalPrice;
  }

  public TopProductDetailResponseDTO(String name, String slug, BigDecimal price, BigDecimal promotionalPrice) {
    this.name = name;
    this.slug = slug;
    this.price = price;
    this.promotionalPrice = promotionalPrice;
  }
}
