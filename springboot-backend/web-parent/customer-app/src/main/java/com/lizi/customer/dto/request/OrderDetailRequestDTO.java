package com.lizi.customer.dto.request;

import lombok.*;

import java.math.BigDecimal;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailRequestDTO {
  private Long productOptionId;
  private Long orderId;
  private BigDecimal price;
  private Integer quantity;

  private boolean enabled;
}
