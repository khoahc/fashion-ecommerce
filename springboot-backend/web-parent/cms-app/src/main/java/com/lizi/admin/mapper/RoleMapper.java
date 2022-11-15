package com.lizi.admin.mapper;

import com.lizi.admin.dto.role.RoleResDto;
import com.lizi.common.entity.Role;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface RoleMapper {

  RoleMapper INSTANCE = Mappers.getMapper(RoleMapper.class);

  RoleResDto roleToDto(Role role);

  List<RoleResDto> rolesToDtos(List<Role> roles);
}
