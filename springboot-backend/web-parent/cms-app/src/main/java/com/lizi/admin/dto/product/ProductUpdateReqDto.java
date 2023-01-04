package com.lizi.admin.dto.product;

import java.math.BigDecimal;
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
public class ProductUpdateReqDto {
  private String name;
  private String description;
  private boolean enabled;
  private BigDecimal cost;
  private BigDecimal price;
  private Long categoryId;
}
