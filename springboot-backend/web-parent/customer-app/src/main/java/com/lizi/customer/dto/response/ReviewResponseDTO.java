package com.lizi.customer.dto.response;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewResponseDTO {

  private String headline;
  private String comment;
  private int rating;
  private String firstName;

}
