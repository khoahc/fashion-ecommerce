package com.lizi.admin.service.implement;

import com.lizi.admin.repository.ImageRepository;
import com.lizi.admin.service.ImageService;
import com.lizi.common.entity.Image;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ImageServiceImpl implements ImageService {

  @Autowired
  private ImageRepository imageRepository;

  @Override
  public Image getImageByUrl(String url) {
    return null;
  }
}
