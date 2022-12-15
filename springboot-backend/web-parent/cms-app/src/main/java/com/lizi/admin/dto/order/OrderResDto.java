package com.lizi.admin.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lizi.admin.dto.customer.CustomerResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.dto.voucher.VoucherResDto;
import java.math.BigDecimal;
import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.lizi.admin.util.Constant;
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
public class OrderResDto {

  private String id;

  private String receiverName;

  private String phoneNumber;

  private String email;

  private String address;

  @JsonFormat(pattern="dd-MM-yyyy hh:mm:ss", timezone = Constant.MY_TIME_ZONE)
  private Date orderTime;

  private BigDecimal shipCost;

  private BigDecimal subtotal;

  private BigDecimal totalPrice;

  private String paymentMethod;

  // latestOrderStatus
  private String orderStatus;

  private boolean verified;

  private boolean packaged;

  private boolean shipping;

  private boolean delivered;

  private boolean cancelled;

  private CustomerResDto customer;

  private VoucherResDto voucher;

  public OrderResDto(String id, String receiverName, String phoneNumber, String email, String address, Date orderTime, BigDecimal shipCost, BigDecimal subtotal, BigDecimal totalPrice, String paymentMethod) {
    this.id = id;
    this.receiverName = receiverName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.orderTime = orderTime;
    this.shipCost = shipCost;
    this.subtotal = subtotal;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
  }
}
