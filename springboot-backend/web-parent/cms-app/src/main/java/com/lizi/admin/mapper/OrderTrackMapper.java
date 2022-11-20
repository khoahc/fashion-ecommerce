package com.lizi.admin.mapper;

import com.lizi.admin.dto.category.CategoryReqDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.common.entity.Category;
import com.lizi.common.entity.OrderTrack;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.factory.Mappers;
@Mapper
public interface OrderTrackMapper {
    OrderTrackMapper INSTANCE = Mappers.getMapper(OrderTrackMapper.class);

    @Mapping(source = "entity.order.id", target = "orderId")
    @Mapping(source = "entity.status", target = "status")
    @Mapping(source = "entity.notes", target = "notes")
    OrderTrackResDto OrderTrackToOrderTrackResDto(OrderTrack entity);
}
