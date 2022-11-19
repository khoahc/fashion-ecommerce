package com.lizi.admin.dto.order;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lizi.admin.dto.customer.CustomerResDto;
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
public class OrderIdReqDto {
  private String orderId;
}
