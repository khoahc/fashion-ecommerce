package com.lizi.admin.service;

import com.lizi.admin.dto.color.ColorResDto;
import com.lizi.admin.dto.color.ColorReqDto;
import com.lizi.common.entity.Color;
import java.util.List;

public interface ColorService {

  List<ColorResDto> getAllColorResDto();
  Color getColorByName(String name);
  Color getColorById(Long id);
  ColorResDto createColor(ColorReqDto dto);
  boolean isExist(String name);
}
