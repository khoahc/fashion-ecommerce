package com.lizi.customer.service;

import com.lizi.common.entity.Ward;

import java.util.List;
import java.util.Optional;

public interface WardService {
  Optional<List<Ward>> getWardsByDistrictId(Long districtId);
}
