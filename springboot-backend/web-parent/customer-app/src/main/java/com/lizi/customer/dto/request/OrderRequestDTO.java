package com.lizi.customer.dto.request;

import lombok.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Set;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderRequestDTO {
  private String fullName;
  private String phoneNumber;
  private String email;
  private String province;
  private String district;
  private String ward;
  private String address;
  private BigDecimal totalPrice;
  private BigDecimal shipCost;
  private Set<ProductCheckoutRequestDTO> products;

}
