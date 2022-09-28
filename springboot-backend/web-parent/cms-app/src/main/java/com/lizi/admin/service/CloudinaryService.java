package com.lizi.admin.service;

import org.springframework.web.multipart.MultipartFile;

public interface CloudinaryService {

  String upload(MultipartFile file);

  String uploadImage(MultipartFile file);
}
