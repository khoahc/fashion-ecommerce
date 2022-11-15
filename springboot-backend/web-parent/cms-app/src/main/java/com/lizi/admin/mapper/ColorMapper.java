package com.lizi.admin.mapper;

import com.lizi.admin.dto.color.ColorReqDto;
import com.lizi.admin.dto.color.ColorResDto;
import com.lizi.common.entity.Color;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ColorMapper {

  ColorMapper INSTANCE = Mappers.getMapper(ColorMapper.class);

  @Mapping(source = "id", target = "id")
  @Mapping(source = "name", target = "name")
  @Mapping(source = "slug", target = "slug")
  @Mapping(source = "hexCode", target = "hexCode")
  ColorResDto toDto(Color color);

  List<ColorResDto> toDtos(List<Color> colors);

  @Mapping(source = "name", target = "name")
  @Mapping(source = "hexCode", target = "hexCode")
  Color toEntity(ColorReqDto dto);
}
