package com.lizi.admin.mapper;

import com.lizi.admin.dto.user.UserReqDto;
import com.lizi.admin.dto.user.UserResDto;
import com.lizi.common.entity.Image;
import com.lizi.common.entity.Role;
import com.lizi.common.entity.User;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

@Mapper
public interface UserMapper {

  UserMapper INSTANCE = Mappers.getMapper(UserMapper.class);

  @Mapping(source = "enabled", target = "enabled")
  User dtoToUser(UserReqDto dto);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "photo.url", target = "photo")
  UserResDto userToDto(User user);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "photo.url", target = "photo")
  List<UserResDto> usersToDtos(List<User> users);


}
