package com.lizi.admin.mapper;

import com.lizi.admin.dto.voucher.VoucherReqDto;
import com.lizi.admin.dto.voucher.VoucherResDto;
import com.lizi.admin.service.VoucherService;
import com.lizi.common.entity.Product;
import com.lizi.common.entity.Voucher;
import java.util.List;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.MappingTarget;
import org.mapstruct.factory.Mappers;

@Mapper
public interface VoucherMapper {

  VoucherMapper INSTANCE = Mappers.getMapper(VoucherMapper.class);

  VoucherResDto voucherToDto(Voucher voucher);

  List<VoucherResDto> vouchersToDtos(List<Voucher> vouchers);

  Voucher dtoToVoucher(VoucherReqDto productReqDto);

  @Mapping(ignore = true, target = "id")
  void updateVoucherFromDto(VoucherReqDto productReqDto, @MappingTarget Voucher voucher);

}
