package com.lizi.admin.dto.user;

import com.lizi.common.entity.Role;
import java.util.Date;
import java.util.Set;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class UserResDto {

  private Long id;
  private String email;
  private String password;
  private String firstName;
  private String lastName;
  private String photo;
  private boolean enabled;
  private Set<Role> roles;
  private Date createTime;
  private Date updateTime;
}
