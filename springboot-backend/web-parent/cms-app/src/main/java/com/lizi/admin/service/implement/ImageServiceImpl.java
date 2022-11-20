package com.lizi.admin.service.implement;

import com.lizi.admin.repository.ImageRepository;
import com.lizi.admin.service.ImageService;
import com.lizi.common.entity.Image;
import com.lizi.common.exception.ResourceNotFoundException;
import java.util.List;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {

  @Autowired
  private ImageRepository imageRepo;

  @Override
  public Image getImageByUrl(String url) {
    return imageRepo.findImageByUrl(url)
        .orElseThrow(() -> new ResourceNotFoundException("image", "url", url));
  }

  @Override
  public List<Image> getImagesByUrls(List<String> urls) {
    return urls.stream().map(url -> getImageByUrl(url)).toList();
  }

  @Override
  public Image getImageById(Long id) {
    return imageRepo.findById(id)
        .orElseThrow(() -> new ResourceNotFoundException("image", "id", id));
  }

  @Override
  public List<Image> getImagesByIds(List<Long> ids) {
    return ids.stream().map(id -> getImageById(id)).toList();
  }
}
