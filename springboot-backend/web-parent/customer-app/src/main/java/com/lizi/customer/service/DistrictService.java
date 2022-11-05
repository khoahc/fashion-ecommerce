package com.lizi.customer.service;

import com.lizi.common.entity.District;

import java.util.List;
import java.util.Optional;

public interface DistrictService {
  Optional<List<District>> getDistrictsByProvinceId(Long provinceId);
}
