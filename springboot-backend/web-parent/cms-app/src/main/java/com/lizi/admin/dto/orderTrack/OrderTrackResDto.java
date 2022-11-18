package com.lizi.admin.dto.orderTrack;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lizi.admin.util.Constant;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class OrderTrackResDto {
  private String orderId;
  private String status;
  private String notes;

  @JsonFormat(pattern="dd-MM-yyyy hh:mm:ss", timezone = Constant.MY_TIME_ZONE)
  private Date updateTime;
}
