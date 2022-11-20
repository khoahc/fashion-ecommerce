package com.lizi.admin.service.implement;

import com.lizi.admin.dto.color.ColorReqDto;
import com.lizi.admin.dto.color.ColorResDto;
import com.lizi.admin.mapper.ColorMapper;
import com.lizi.admin.repository.ColorRepository;
import com.lizi.admin.service.ColorService;
import com.lizi.admin.util.Util;
import com.lizi.common.entity.Color;
import com.lizi.common.exception.ResourceAlreadyExistsException;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import java.util.Optional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ColorServiceImpl implements ColorService {

  @Autowired
  private ColorRepository colorRepo;

  @Override
  public List<ColorResDto> getAllColorResDto() {
    return ColorMapper.INSTANCE.toDtos(colorRepo.findAll());
  }

  @Override
  public Color getColorByName(String name) {
    return colorRepo.findByName(name)
        .orElseThrow(() -> new ResourceNotFoundException("color", "name", name));
  }

  @Override
  public Color getColorById(Long id) {
    return colorRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("color", "id", id));
  }

  @Override
  public ColorResDto createColor(ColorReqDto dto) {
    if(isExist(dto.getName())) {
      throw new ResourceAlreadyExistsException("color", "name", dto.getName());
    }
    String slug = Util.toSlug(dto.getName());

    Color color = ColorMapper.INSTANCE.toEntity(dto);
    color.setSlug(slug);

    return ColorMapper.INSTANCE.toDto(colorRepo.save(color));
  }

  @Override
  public boolean isExist(String name) {
    return colorRepo.existsByName(name);
  }
}
