package com.lizi.admin.service.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.lizi.admin.exception.UploadException;
import com.lizi.admin.service.CloudinaryService;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class CloudinaryServiceImpl implements CloudinaryService {

  @Autowired
  private Cloudinary cloudinary;

  @Value("${cloudinary.folder}")
  private String folderCloud;

  @Override
  public String upload(MultipartFile file) {
    try {
      Map r = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap("resource_type", "auto"));

      return (String) r.get("secure_url");
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  @Override
  public String uploadImage(MultipartFile file) {
    if (file.isEmpty()) {
      throw new UploadException("File is empty");
    }

    if (!isImageFile(file)) {
      throw new UploadException("You can only upload image file");
    }

    float fileSize = file.getSize() / 1_000_000.0f;
    if (fileSize > 5.0f) {
      throw new UploadException("File size must be less than 5MB");
    }

    try {
      Map r = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.asMap(
          "resource_type", "auto",
          "folder", folderCloud
      ));

      return (String) r.get("secure_url");
    } catch (IOException e) {
      throw new RuntimeException(e);
    }
  }

  private boolean isImageFile(MultipartFile file) {
    String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
    assert fileExtension != null;
    return Arrays.asList(new String[]{"png", "jpg", "jpeg", "bmp"})
        .contains(fileExtension.trim().toLowerCase());
  }
}
