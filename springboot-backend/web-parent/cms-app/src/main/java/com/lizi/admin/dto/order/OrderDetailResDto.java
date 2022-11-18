package com.lizi.admin.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lizi.admin.dto.customer.CustomerResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.dto.product.ProductOrderResDto;
import com.lizi.admin.dto.voucher.VoucherResDto;
import com.lizi.admin.util.Constant;
import lombok.*;

import java.math.BigDecimal;
import java.util.Date;
import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderDetailResDto {

  private String id;
  @JsonFormat(pattern="dd-MM-yyyy hh:mm:ss", timezone = Constant.MY_TIME_ZONE)
  private Date orderTime;
  private String receiverName;
  private String phoneNumber;
  private String email;
  private String address;
  private BigDecimal shipCost;
  private BigDecimal totalPrice;
  private String paymentMethod;
  private String orderStatus;

  private List<OrderTrackResDto> orderTrackResDtoList;

  private CustomerResDto customer = null;
  private VoucherResDto voucher = null;

  private List<ProductOrderResDto> products;

  public OrderDetailResDto(String id, Date orderTime, String receiverName, String phoneNumber, String email, String address, BigDecimal shipCost, BigDecimal totalPrice, String paymentMethod, String orderStatus) {
    this.id = id;
    this.orderTime = orderTime;
    this.receiverName = receiverName;
    this.phoneNumber = phoneNumber;
    this.email = email;
    this.address = address;
    this.shipCost = shipCost;
    this.totalPrice = totalPrice;
    this.paymentMethod = paymentMethod;
    this.orderStatus = orderStatus;
  }
}
