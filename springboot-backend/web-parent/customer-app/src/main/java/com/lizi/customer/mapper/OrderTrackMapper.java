package com.lizi.customer.mapper;

import com.lizi.common.entity.OrderTrack;
import com.lizi.customer.dto.response.OrderTrackResponseDTO;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;
import org.mapstruct.factory.Mappers;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;

@Mapper(componentModel = "spring")
public interface OrderTrackMapper {
  OrderTrackMapper INSTANCE = Mappers.getMapper(OrderTrackMapper.class);

  @Mapping(target = "status", source = "entity.status")
  @Mapping(target = "notes", source = "entity.notes")
  @Mapping(target = "updateTime", source = "entity.updateTime")
  OrderTrackResponseDTO orderTrackToOrderTrackResponseDTO(OrderTrack entity);

}
