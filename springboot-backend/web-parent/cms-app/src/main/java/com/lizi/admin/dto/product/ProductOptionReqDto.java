package com.lizi.admin.dto.product;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ProductOptionReqDto {
  private Long id;
  private String size;
  private int quantity;
  private ProductColorReqDto productColor;
}
