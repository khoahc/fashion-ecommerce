package com.lizi.customer.service.implement;

import com.lizi.common.entity.Province;
import com.lizi.customer.repository.ProvinceRepository;
import com.lizi.customer.service.ProvinceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ProvinceServiceImpl implements ProvinceService {

  @Autowired
  private ProvinceRepository provinceRepository;

  @Override
  public Optional<List<Province>> getAllProvince() {
    Optional<List<Province>> listProvince = Optional.of(provinceRepository.findAll());
    return listProvince;
  }
}
