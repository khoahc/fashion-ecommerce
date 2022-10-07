package com.lizi.admin.service.implement;

import com.lizi.admin.dto.user.UserReqDto;
import com.lizi.admin.dto.user.UserResDto;
import com.lizi.admin.exception.ResourceAlreadyExistsException;
import com.lizi.admin.exception.ResourceNotFoundException;
import com.lizi.admin.mapper.UserMapper;
import com.lizi.admin.repository.ImageRepository;
import com.lizi.admin.repository.RoleRepository;
import com.lizi.admin.repository.UserRepository;
import com.lizi.admin.service.UserService;
import com.lizi.common.entity.Image;
import com.lizi.common.entity.Role;
import com.lizi.common.entity.User;
import java.util.List;
import java.util.Optional;
import java.util.Set;
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
  private ImageRepository imageRepo;

  @Autowired
  private RoleRepository roleRepo;

  @Autowired
  private BCryptPasswordEncoder passwordEncoder;

  @Override
  public List<UserResDto> getAll() {
    return UserMapper.INSTANCE.usersToDtos(userRepo.findAll());
  }

  @Override
  public UserResDto getUser(Long id) {
    return UserMapper.INSTANCE.userToDto(
        userRepo.findById(id).orElseThrow(() -> new ResourceNotFoundException("user", "id", id)));
  }

  @Override
  @Transactional
  public UserResDto createUser(UserReqDto userReqDto) {
    if (userRepo.findByEmail(userReqDto.getEmail()).isPresent()) {
      throw new ResourceAlreadyExistsException("user", "email", userReqDto.getEmail());
    }

    Image photo = imageRepo.findById(userReqDto.getPhotoId())
        .orElseThrow(() -> new ResourceNotFoundException("image", "id", userReqDto.getPhotoId()));

    Set<Role> roles = userReqDto.getRoleIds().stream().map(rId -> roleRepo.findById(rId)
            .orElseThrow(() -> new ResourceNotFoundException("role", "id", rId)))
        .collect(Collectors.toSet());

    User newUser = UserMapper.INSTANCE.dtoToUser(userReqDto);
    newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
    newUser.setPhoto(photo);
    newUser.setRoles(roles);

    return UserMapper.INSTANCE.userToDto(userRepo.saveAndFlush(newUser));
  }

  @Override
  @Transactional
  public UserResDto updateUser(Long id, UserReqDto userReqDto) {
    User user = userRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("user", "id", id));

    Optional<User> userBeGetByEmailOptional = userRepo.findByEmail(userReqDto.getEmail());
    if (userBeGetByEmailOptional.isPresent()) {
      User userBeGetByEmail = userBeGetByEmailOptional.get();

      if (!user.equals(userBeGetByEmail)) {
        throw new ResourceAlreadyExistsException("user", "email", userReqDto.getEmail());
      }
    }

    Image photo = imageRepo.findById(userReqDto.getPhotoId())
        .orElseThrow(() -> new ResourceNotFoundException("image", "id", userReqDto.getPhotoId()));

    Set<Role> roles = userReqDto.getRoleIds().stream().map(rId -> roleRepo.findById(rId)
            .orElseThrow(() -> new ResourceNotFoundException("role", "id", rId)))
        .collect(Collectors.toSet());

    user.setEmail(userReqDto.getEmail());
    user.setPassword(passwordEncoder.encode(userReqDto.getPassword()));
    user.setFirstName(userReqDto.getFirstName());
    user.setLastName(userReqDto.getLastName());
    user.setEnabled(userReqDto.isEnabled());

    user.setPhoto(photo);
    user.setRoles(roles);

    return UserMapper.INSTANCE.userToDto(userRepo.save(user));
  }

  @Override
  @Transactional
  public void deleteUser(Long id) {
    userRepo.deleteById(id);
  }
}
