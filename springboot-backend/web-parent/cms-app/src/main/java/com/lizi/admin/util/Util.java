package com.lizi.admin.util;

import java.text.Normalizer;
import java.util.Locale;
import java.util.regex.Pattern;

public class Util {

  private static final Pattern WHITESPACE = Pattern.compile("[\\s]");

  public static String toSlug(String input) {
    // remove the sign
    String temp = Normalizer.normalize(input, Normalizer.Form.NFD);
    Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
    temp = pattern.matcher(temp).replaceAll("");
    temp = temp.replaceAll("đ", "d");

    String slug = WHITESPACE.matcher(temp).replaceAll("-");
    return slug.toLowerCase(Locale.ENGLISH);
  }

}
