package com.lizi.admin.service;

import com.lizi.admin.dto.image.ImageResDto;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

  ImageResDto uploadImage(MultipartFile file);

  List<ImageResDto> uploadImages(MultipartFile[] files);

  ImageResDto uploadImageUser(MultipartFile file);

  ImageResDto uploadImageProduct(MultipartFile file);

  List<ImageResDto> uploadImagesProduct(MultipartFile[] files);

  ImageResDto uploadImageCategory(MultipartFile file);
}
