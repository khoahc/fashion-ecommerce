package com.lizi.admin.service.implement;

import com.lizi.admin.dto.user.UserResDto;
import com.lizi.admin.mapper.UserMapper;
import com.lizi.admin.repository.UserRepository;
import com.lizi.admin.service.UserService;
import java.util.List;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepo;
  @Override
  public List<UserResDto> getAll() {
    return userRepo.findAll().stream().map(u -> UserMapper.INSTANCE.userToDto(u))
        .collect(Collectors.toList());
  }
}
