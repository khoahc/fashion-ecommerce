package com.lizi.customer.dto.request;


import lombok.*;

@Setter
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderTrackerRequestDTO {
  private String orderId;
  private String email;
}
