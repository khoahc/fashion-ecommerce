package com.lizi.admin.service.implement;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.lizi.admin.dto.image.ImageResDto;
import com.lizi.admin.mapper.ImageMapper;
import com.lizi.admin.repository.ImageRepository;
import com.lizi.admin.service.CloudinaryService;
import com.lizi.common.entity.Image;
import com.lizi.common.exception.UploadException;
import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;
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

  private float maxFileSize = 50.0f;

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
  public ImageResDto uploadImage(MultipartFile file) {
    beforeCheck(file);

    Map r = upload(file, "");
    Image newImage = saveImage(r);

    return ImageMapper.INSTANCE.imageToDto(newImage);
  }

  @Override
  public List<ImageResDto> uploadImages(MultipartFile[] files) {
    return Arrays.stream(files).map(file -> uploadImage(file)).collect(Collectors.toList());
  }

  @Override
  public ImageResDto uploadImageUser(MultipartFile file) {
    beforeCheck(file);

    Map r = upload(file, "/users");
    Image newImage = saveImage(r);

    return ImageMapper.INSTANCE.imageToDto(newImage);
  }

  @Override
  public ImageResDto uploadImageProduct(MultipartFile file) {
    beforeCheck(file);

    Map r = upload(file, "/products");
    Image newImage = saveImage(r);

    return ImageMapper.INSTANCE.imageToDto(newImage);
  }

  @Override
  public List<ImageResDto> uploadImagesProduct(MultipartFile[] files) {
    return Arrays.stream(files).map(file -> uploadImageProduct(file)).collect(Collectors.toList());
  }

  @Override
  public ImageResDto uploadImageCategory(MultipartFile file) {
    beforeCheck(file);

    Map r = upload(file, "/categories");
    Image newImage = saveImage(r);

    return ImageMapper.INSTANCE.imageToDto(newImage);
  }

  private boolean isImageFile(MultipartFile file) {
    String fileExtension = FilenameUtils.getExtension(file.getOriginalFilename());
    assert fileExtension != null;
    return Arrays.asList(new String[]{"png", "jpg", "jpeg", "bmp"})
        .contains(fileExtension.trim().toLowerCase());
  }

  private Image saveImage(Map r) {
    Image newImage = new Image();
    newImage.setUrl((String) r.get("secure_url"));
    newImage.setCloudinaryId((String) r.get("public_id"));

    imageRepo.save(newImage);
    return newImage;
  }
}
