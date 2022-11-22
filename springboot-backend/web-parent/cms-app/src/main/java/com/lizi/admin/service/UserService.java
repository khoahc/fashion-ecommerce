package com.lizi.admin.service;

import com.lizi.admin.dto.user.UserReqDto;
import com.lizi.admin.dto.user.UserResDto;
import java.security.Principal;
import java.util.List;
import org.springframework.data.domain.Pageable;

public interface UserService {

  List<UserResDto> getAll();
  List<UserResDto> getAll(Pageable pageable);
  Long getTotalCount(Pageable pageable);

  UserResDto getUser(Long id);

  UserResDto getUser(String email);

  UserResDto createUser(UserReqDto userReqDto);

  UserResDto updateUser(Long id, UserReqDto userReqDto);

  void deleteUser(Long id);

}
