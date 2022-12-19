package com.lizi.customer.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ReviewRequestDTO {

  private String headline;
  private String comment;
  private int rating;
  private String fullName;
  private String email;
  private String productSlug;

}
