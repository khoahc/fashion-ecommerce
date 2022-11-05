package com.lizi.customer.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductCheckoutRequestDTO {
  private String name;
  private String slugProduct;
  private String image;
  private String size;
  private String color;
  private String slugColor;
  private BigDecimal price;
  private Integer quantity;
  private Integer count;
  private boolean enabled;
}
