package com.lizi.admin.service.implement;

import com.lizi.admin.dto.role.RoleResDto;
import com.lizi.admin.mapper.RoleMapper;
import com.lizi.admin.repository.RoleRepository;
import com.lizi.admin.service.RoleService;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class RoleServiceImpl implements RoleService {

  @Autowired
  private RoleRepository roleRepo;

  @Override
  public List<RoleResDto> getAll() {
    return RoleMapper.INSTANCE.rolesToDtos(roleRepo.findAll());
  }
}
