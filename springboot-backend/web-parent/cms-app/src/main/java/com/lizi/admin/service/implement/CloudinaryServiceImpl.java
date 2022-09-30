package com.lizi.admin.service.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.lizi.admin.dto.image.ImageResDto;
import com.lizi.admin.exception.UploadException;
import com.lizi.admin.mapper.ImageMapper;
import com.lizi.admin.repository.ImageRepository;
import com.lizi.admin.service.CloudinaryService;
import com.lizi.common.entity.Image;
import java.io.IOException;
import java.util.Arrays;
import java.util.Map;
import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

@Service
@Transactional
public class CloudinaryServiceImpl implements CloudinaryService {

  @Autowired
  private Cloudinary cloudinary;

  @Autowired
  private ImageRepository imageRepo;

  @Value("${cloudinary.folder}")
  private String rootFolder;

  private float maxFileSize = 10.0f;

  private Map uploadCloudinary(MultipartFile file, Map option) {
    try {
      return cloudinary.uploader().upload(file.getBytes(), option);
    } catch (IOException e) {
      e.printStackTrace();
      throw new UploadException(e.getMessage());
    }
  }

  private Map upload(MultipartFile file, String folder) {
    String folderCloud = rootFolder + folder;

    return uploadCloudinary(file, ObjectUtils.asMap(
        "resource_type", "auto",
        "folder", folderCloud
    ));
  }

  private void beforeCheck(MultipartFile file) {
    if (file.isEmpty()) {
      throw new UploadException("File is empty");
    }

    if (!isImageFile(file)) {
      throw new UploadException("You can only upload image file");
    }

    float fileSize = file.getSize() / 1_000_000.0f;
    if (fileSize > maxFileSize) {
      throw new UploadException("File size must be less than 5MB");
    }
  }

  @Override
  public String uploadImage(MultipartFile file) {
    beforeCheck(file);

    return (String) uploadCloudinary(file, ObjectUtils.asMap(
        "resource_type", "auto",
        "folder", rootFolder
    )).get("secure_url");
  }

  @Override
  public ImageResDto uploadImageUser(MultipartFile file) {
    beforeCheck(file);

    Map r = upload(file, "/users");

    Image newImage = new Image();
    newImage.setUrl((String) r.get("secure_url"));
    newImage.setCloudinaryId((String) r.get("public_id"));

    imageRepo.save(newImage);

    return ImageMapper.INSTANCE.imageToDto(newImage);
  }

  @Override
  public ImageResDto uploadImageProduct(MultipartFile file) {
    beforeCheck(file);

    Map r = upload(file, "/products");

    Image newImage = new Image();
    newImage.setUrl((String) r.get("secure_url"));
    newImage.setCloudinaryId((String) r.get("public_id"));

    imageRepo.save(newImage);

    return ImageMapper.INSTANCE.imageToDto(newImage);
  }

  @Override
  public ImageResDto uploadImageCategory(MultipartFile file) {
    beforeCheck(file);

    Map r = upload(file, "/categories");

    Image newImage = new Image();
    newImage.setUrl((String) r.get("secure_url"));
    newImage.setCloudinaryId((String) r.get("public_id"));

    imageRepo.save(newImage);

    return ImageMapper.INSTANCE.imageToDto(newImage);
  }

  private boolean isImageFile(MultipartFile file) {
    String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
    assert fileExtension != null;
    return Arrays.asList(new String[]{"png", "jpg", "jpeg", "bmp"})
        .contains(fileExtension.trim().toLowerCase());
  }
}
