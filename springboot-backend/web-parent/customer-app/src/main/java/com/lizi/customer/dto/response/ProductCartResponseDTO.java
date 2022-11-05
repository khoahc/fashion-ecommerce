package com.lizi.customer.dto.response;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ProductCartResponseDTO {

  private String name;
  private String slugProduct;
  private String image;
  private String size;
  private String color;
  private String slugColor;
  private BigDecimal price;
  private int quantity;

}
