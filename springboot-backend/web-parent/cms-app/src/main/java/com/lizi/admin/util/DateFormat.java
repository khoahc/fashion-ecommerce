package com.lizi.admin.util;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class DateFormat {
  public static String DateToString(Date date) {
    DateTimeFormatter dateTimeFormatter = DateTimeFormatter.ofPattern(Constant.PATTERN_DATETIME);
    LocalDateTime localDateTime = date.toInstant().atZone(ZoneId.systemDefault()).toLocalDateTime();
    return dateTimeFormatter.format(ZonedDateTime.of(localDateTime, ZoneId.of(Constant.TIME_ZONE_VN)));
  }
}
