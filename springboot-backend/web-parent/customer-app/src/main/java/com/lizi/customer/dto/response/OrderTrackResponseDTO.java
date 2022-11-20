package com.lizi.customer.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lizi.customer.util.Constant;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class OrderTrackResponseDTO {
  private String status;

  @JsonFormat(pattern="dd-MM-yyyy hh:mm:ss", timezone = Constant.MY_TIME_ZONE)
  private Date updateTime;
}
