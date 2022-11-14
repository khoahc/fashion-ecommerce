package com.lizi.admin.service.implement;

import com.lizi.admin.dto.voucher.VoucherReqDto;
import com.lizi.admin.dto.voucher.VoucherResDto;
import com.lizi.admin.mapper.VoucherMapper;
import com.lizi.admin.repository.VoucherRepository;
import com.lizi.admin.service.VoucherService;
import com.lizi.common.entity.Voucher;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class VoucherServiceImpl implements VoucherService {

  @Autowired
  private VoucherRepository voucherRepo;

  @Override
  public List<VoucherResDto> getAll() {
    return VoucherMapper.INSTANCE.vouchersToDtos(voucherRepo.findAll());
  }

  @Override
  public VoucherResDto getVoucher(Long id) {
    return VoucherMapper.INSTANCE.voucherToDto(voucherRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("voucher", "id", id)));
  }

  @Override
  public VoucherResDto createVoucher(VoucherReqDto voucherReqDto) {
    Voucher newVoucher = VoucherMapper.INSTANCE.dtoToVoucher(voucherReqDto);
    return VoucherMapper.INSTANCE.voucherToDto(voucherRepo.save(newVoucher));
  }

  @Override
  public VoucherResDto updateVoucher(Long id, VoucherReqDto voucherReqDto) {
    Voucher voucher = voucherRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("voucher", "id", id));
    return VoucherMapper.INSTANCE.voucherToDto(voucherRepo.save(voucher));
  }

  @Override
  public void deleteVoucher(Long id) {
    voucherRepo.deleteById(id);
  }
}
