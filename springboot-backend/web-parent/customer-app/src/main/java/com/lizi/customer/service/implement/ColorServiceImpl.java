package com.lizi.customer.service.implement;

import com.lizi.common.entity.Color;
import com.lizi.customer.repository.CategoryRepository;
import com.lizi.customer.repository.ColorRepository;
import com.lizi.customer.service.ColorService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.Set;

@Service
public class ColorServiceImpl implements ColorService {
  @Autowired
  private ColorRepository colorRepository;

  @Autowired
  private CategoryRepository categoryRepository;

  @Override
  public Optional<Set<Color>> getAllColorBySlugCategory(String slugCategory) {
    Integer idCategory = categoryRepository.findIdBySlug(slugCategory);
    return colorRepository.findAllColorsBySlugCategory(slugCategory, idCategory);
  }

  @Override
  public List<Color> getAllColors() {
    return colorRepository.findAll();
  }
}
