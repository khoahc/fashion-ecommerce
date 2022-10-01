package com.lizi.admin.mapper;

import com.lizi.admin.dto.user.UserReqDto;
import com.lizi.admin.dto.user.UserResDto;
import com.lizi.common.entity.Image;
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
  @Mapping(source = "roleIds", target = "roles", qualifiedByName = "idsSetToRolesSet")
  @Mapping(source = "photoId", target = "photo", qualifiedByName = "idPhotoToImage")
  User dtoToUser(UserReqDto dto);

  @Mapping(source = "enabled", target = "enabled")
  @Mapping(source = "photo.url", target = "photo")
  UserResDto userToDto(User user);

  @Named("idPhotoToImage")
   public static Image idPhotoToImage(Long id) {
     return Image.builder().id(id).build();
   }

  @Named("idsSetToRolesSet")
  public static Set<Role> idsSetToRolesSet(Set<Long> ids) {
    return ids.stream().map(id -> Role.builder().id(id).build()).collect(Collectors.toSet());
  }

}
