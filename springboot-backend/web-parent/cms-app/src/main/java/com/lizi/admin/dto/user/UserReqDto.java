package com.lizi.admin.dto.user;

import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserReqDto {

  private Long id;
  private String email;
  private String password;
  private String firstName;
  private String lastName;
  private boolean enabled;
  private Long photoId;
  private Set<Long> roleIds;

}
