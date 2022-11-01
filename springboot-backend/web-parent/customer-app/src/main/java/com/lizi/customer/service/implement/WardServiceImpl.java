package com.lizi.customer.service.implement;

import com.lizi.common.entity.Ward;
import com.lizi.customer.repository.WardRepository;
import com.lizi.customer.service.WardService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class WardServiceImpl implements WardService {

  @Autowired
  private WardRepository wardRepository;

  @Override
  public Optional<List<Ward>> getWardsByDistrictId(Long districtId) {
    Optional<List<Ward>> listWard = wardRepository.findByDistrictId(districtId);
    return listWard;
  }
}
