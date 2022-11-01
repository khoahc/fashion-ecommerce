package com.lizi.customer.service;

import com.lizi.common.entity.Province;

import java.util.List;
import java.util.Optional;

public interface ProvinceService {
  Optional<List<Province>> getAllProvince();

}
