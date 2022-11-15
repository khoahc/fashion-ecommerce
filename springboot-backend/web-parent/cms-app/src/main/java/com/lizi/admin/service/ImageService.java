package com.lizi.admin.service;

import com.lizi.common.entity.Image;
import java.util.List;

public interface ImageService {

  Image getImageByUrl(String url);
  List<Image> getImagesByUrls(List<String> urls);
  Image getImageById(Long id);
  List<Image> getImagesByIds(List<Long> ids);
}
