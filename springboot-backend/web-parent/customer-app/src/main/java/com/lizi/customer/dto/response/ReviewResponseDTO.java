package com.lizi.customer.dto.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.lizi.customer.util.Constant;
import lombok.*;

import java.util.Date;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponseDTO {

  private String headline;
  private String comment;
  private int rating;
  private String fullName;
  @JsonFormat(pattern="dd-MM-yyyy hh:mm:ss", timezone = Constant.MY_TIME_ZONE)
  private Date reviewTime;
  private boolean bought;

}
