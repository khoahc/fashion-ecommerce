package com.lizi.admin.service;

import com.lizi.admin.dto.voucher.VoucherReqDto;
import com.lizi.admin.dto.voucher.VoucherResDto;
import java.util.List;

public interface VoucherService {

  List<VoucherResDto> getAll();

  VoucherResDto getVoucher(Long id);

  VoucherResDto createVoucher(VoucherReqDto voucherReqDto);

  VoucherResDto updateVoucher(Long id, VoucherReqDto voucherReqDto);

  void deleteVoucher(Long id);
}
