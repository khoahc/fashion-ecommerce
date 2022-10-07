package com.lizi.admin.service.implement;

import com.lizi.admin.dto.user.UserReqDto;
import com.lizi.admin.dto.user.UserResDto;
import com.lizi.admin.exception.ResourceAlreadyExistsException;
import com.lizi.admin.exception.ResourceNotFoundException;
import com.lizi.admin.mapper.UserMapper;
import com.lizi.admin.repository.UserRepository;
import com.lizi.admin.service.UserService;
import com.lizi.common.entity.User;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class UserServiceImpl implements UserService {

  @Autowired
  private UserRepository userRepo;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Override
  public List<UserResDto> getAll() {
    return userRepo.findAll().stream().map(u -> UserMapper.INSTANCE.userToDto(u))
        .collect(Collectors.toList());
  }

  @Override
  public UserResDto getUser(Long id) {
    return userRepo.findById(id).map(u -> UserMapper.INSTANCE.userToDto(u))
        .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));
  }

  @Override
  @Transactional
  public UserResDto createUser(UserReqDto userReqDto) {
    if (userRepo.findByEmail(userReqDto.getEmail()).isPresent()) {
      throw new ResourceAlreadyExistsException("user", "email", userReqDto.getEmail());
    }

    User newUser = UserMapper.INSTANCE.dtoToUser(userReqDto);
    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));

    return UserMapper.INSTANCE.userToDto(userRepo.saveAndFlush(newUser));
  }

  @Override
  @Transactional
  public UserResDto updateUser(Long id, UserReqDto userReqDto) {
    Optional<User> userGetByIdOptional = userRepo.findById(id);

    if (userGetByIdOptional.isEmpty()) {
      throw new ResourceNotFoundException("user", "id", id);
    }

    Optional<User> userGetByEmailOptional = userRepo.findByEmail(userReqDto.getEmail());
    if (userGetByEmailOptional.isPresent()) {
      if (!userGetByEmailOptional.equals(userGetByEmailOptional)) {
        throw new ResourceAlreadyExistsException("user", "email", userReqDto.getEmail());
      }
    }

    User user = userGetByIdOptional.get();
    User dataUpdate = UserMapper.INSTANCE.dtoToUser(userReqDto);

    user.setEmail(dataUpdate.getEmail());
    user.setPassword(passwordEncoder.encode(dataUpdate.getPassword()));
    user.setFirstName(dataUpdate.getFirstName());
    user.setLastName(dataUpdate.getLastName());
    user.setPhoto(dataUpdate.getPhoto());
    user.setEnabled(dataUpdate.isEnabled());
    user.setRoles(dataUpdate.getRoles());

    return UserMapper.INSTANCE.userToDto(userRepo.save(user));
  }

  @Override
  @Transactional
  public void deleteUser(Long id) {
    userRepo.deleteById(id);
  }
}
