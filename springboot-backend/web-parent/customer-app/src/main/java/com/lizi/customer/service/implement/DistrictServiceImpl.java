package com.lizi.customer.service.implement;

import com.lizi.common.entity.District;
import com.lizi.customer.repository.DistrictRepository;
import com.lizi.customer.service.DistrictService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class DistrictServiceImpl implements DistrictService {

  @Autowired
  private DistrictRepository districtRepository;

  @Override
  public Optional<List<District>> getDistrictsByProvinceId(Long provinceId) {
    Optional<List<District>> listDistrict = districtRepository.findByProvinceId(provinceId);
    return listDistrict;
  }
}
