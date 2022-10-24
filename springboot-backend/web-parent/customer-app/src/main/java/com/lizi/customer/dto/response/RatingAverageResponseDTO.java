package com.lizi.customer.dto.response;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class RatingAverageResponseDTO {
  private String slugProduct;
  private Double avgRating;

  public RatingAverageResponseDTO(String slugProduct, Double avgRating) {
    this.slugProduct = slugProduct;
    this.avgRating = avgRating;
  }
}
