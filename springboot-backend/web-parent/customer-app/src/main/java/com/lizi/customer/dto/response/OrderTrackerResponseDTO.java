package com.lizi.customer.dto.response;

import com.lizi.common.entity.OrderTrack;
import lombok.*;

import java.math.BigDecimal;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderTrackerResponseDTO {
  private String orderId;
  private String orderTime;
  private BigDecimal totalPrice;
  private BigDecimal shipCost;
  private List<ProductCartResponseDTO> products;
  private List<OrderTrackResponseDTO> orderTracks;
}
