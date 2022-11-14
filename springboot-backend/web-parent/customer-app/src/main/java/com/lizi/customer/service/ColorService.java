package com.lizi.customer.service;

import com.lizi.common.entity.Color;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface ColorService {
  Optional<Set<Color>> getAllColorBySlugCategory(String slugCategory);
  List<Color> getAllColors();

}
