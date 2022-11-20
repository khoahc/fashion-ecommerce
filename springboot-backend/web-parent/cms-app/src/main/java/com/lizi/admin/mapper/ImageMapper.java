package com.lizi.admin.mapper;

import com.lizi.admin.dto.image.ImageResDto;
import com.lizi.admin.dto.user.UserResDto;
import com.lizi.common.entity.Image;
import com.lizi.common.entity.User;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;

@Mapper
public interface ImageMapper {

  ImageMapper INSTANCE = Mappers.getMapper(ImageMapper.class);

  ImageResDto imageToDto(Image image);

}
