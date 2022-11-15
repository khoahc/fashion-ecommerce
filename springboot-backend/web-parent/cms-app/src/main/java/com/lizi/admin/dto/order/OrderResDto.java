package com.lizi.admin.dto.order;

import com.lizi.admin.dto.customer.CustomerResDto;
import com.lizi.admin.dto.voucher.VoucherResDto;
import java.math.BigDecimal;
import java.util.Date;
import java.util.UUID;
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
  private Date orderTime;
  private BigDecimal shipCost;
  private BigDecimal subtotal;
  private BigDecimal totalPrice;
  private String paymentMethod;
  private CustomerResDto customer;
  private VoucherResDto voucher;

}
