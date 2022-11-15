package com.lizi.admin.dto.customer;

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
public class CustomerResDto {

  private Long id;
  private String firstName;
  private String lastName;
  private String phoneNumber;
  private String email;
  private String password;
  private boolean enabled;
  private String mainAddress;
}
