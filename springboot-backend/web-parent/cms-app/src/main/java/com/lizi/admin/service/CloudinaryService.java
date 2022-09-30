package com.lizi.admin.service;

import com.lizi.admin.dto.image.ImageResDto;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

  String uploadImage(MultipartFile file);

  ImageResDto uploadImageUser(MultipartFile file);

  ImageResDto uploadImageProduct(MultipartFile file);

  ImageResDto uploadImageCategory(MultipartFile file);
}
