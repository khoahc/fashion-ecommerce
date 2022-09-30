package com.lizi.admin.mapper;

import com.lizi.admin.dto.user.UserReqDto;
import com.lizi.admin.dto.user.UserResDto;
import com.lizi.common.entity.Role;
import com.lizi.common.entity.User;
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
  @Mapping(source = "role_ids", target = "roles", qualifiedByName = "idsSetToRolesSet")
  User dtoToUser(UserReqDto dto);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "photo.url", target = "photo")
  UserResDto userToDto(User user);

  @Named("idsSetToRolesSet")
  public static Set<Role> idsSetToRolesSet(Set<Long> ids) {
    return ids.stream().map(id -> Role.builder().id(id).build()).collect(Collectors.toSet());
  }

}
