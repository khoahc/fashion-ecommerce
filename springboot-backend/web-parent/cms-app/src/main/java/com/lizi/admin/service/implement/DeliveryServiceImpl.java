package com.lizi.admin.service.implement;

import com.lizi.admin.dto.order.OrderResDto;
import com.lizi.admin.dto.orderTrack.OrderTrackResDto;
import com.lizi.admin.mapper.OrderMapper;
import com.lizi.admin.mapper.OrderTrackMapper;
import com.lizi.admin.repository.OrderRepository;
import com.lizi.admin.repository.OrderTrackRepository;
import com.lizi.admin.service.DeliveryService;
import com.lizi.admin.service.OrderService;
import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderStatus;
import com.lizi.common.entity.OrderTrack;
import java.io.UnsupportedEncodingException;
import java.util.List;
import java.util.stream.Collectors;
import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
public class DeliveryServiceImpl implements DeliveryService {

  @Autowired
  private OrderTrackRepository orderTrackRepo;

  @Autowired
  private OrderService orderService;

  @Autowired
  private JavaMailSender mailSender;

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = true)
  public List<OrderResDto> getAllOrder(Pageable pageable) {
    List<OrderResDto> orderResDtoList = OrderMapper.INSTANCE.entitiesToDtos(
        orderTrackRepo.findAllToDeliver(pageable).getContent());

    return orderResDtoList.stream().map(orderResDto -> {
          orderResDto.setOrderStatus(orderTrackRepo.findStatusOrderTrackByOrderId(orderResDto.getId()));
          orderService.setOrderCheckStatusForOrderResDto(orderResDto);
          return orderResDto;
        }
    ).collect(Collectors.toList());
  }

  @Override
  @Transactional(propagation = Propagation.REQUIRES_NEW, readOnly = true)
  public Long getTotalCount(Pageable pageable) {
    return orderTrackRepo.findAllToDeliver(pageable).getTotalElements();
  }

  @Override
  public OrderTrackResDto deliveringOrder(String id) {
    Order order = orderService.getOrder(id);

    OrderTrack orderTrack = OrderTrack.builder()
        .notes(OrderStatus.SHIPPING.defaultDescription())
        .status(OrderStatus.SHIPPING).order(order)
        .build();

    return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(orderTrackRepo.save(orderTrack));
  }

  @Override
  public OrderTrackResDto deliveredOrder(String id)
      throws MessagingException, UnsupportedEncodingException {
    Order order = orderService.getOrder(id);

    OrderTrack orderTrack = OrderTrack.builder()
        .notes(OrderStatus.DELIVERED.defaultDescription())
        .status(OrderStatus.DELIVERED).order(order)
        .build();

    sendSuccessDeliveryOrder(order);

    return OrderTrackMapper.INSTANCE.OrderTrackToOrderTrackResDto(orderTrackRepo.save(orderTrack));
  }

  private void sendSuccessDeliveryOrder(Order order)
      throws MessagingException, UnsupportedEncodingException {
    String toAddress = order.getEmail();
    String fromAddress = "phongnha0167@gmail.com";
    String senderName = "Lizi";
    String subject = "[LIZI] - Đơn hàng của bạn đã được giao thành công";
    String content =
        "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
            "\n" +
            "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
            "\n" +
            "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
            "    <tbody><tr>\n" +
            "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
            "        \n" +
            "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
            "          <tbody><tr>\n" +
            "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
            "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;margin:auto\">\n" +
            "                  <tbody><tr>\n" +
            "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px\">\n" +
            "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">Xác nhận đơn hàng</span>\n" +
            "                    </td>\n" +
            "                  </tr>\n" +
            "                </tbody></table>\n" +
            "              </a>\n" +
            "            </td>\n" +
            "          </tr>\n" +
            "        </tbody></table>\n" +
            "        \n" +
            "      </td>\n" +
            "    </tr>\n" +
            "  </tbody></table>\n" +
            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
            "    <tbody><tr>\n" +
            "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
            "      <td>\n" +
            "        \n" +
            "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
            "                  <tbody><tr>\n" +
            "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
            "                  </tr>\n" +
            "                </tbody></table>\n" +
            "        \n" +
            "      </td>\n" +
            "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
            "    </tr>\n" +
            "  </tbody></table>\n" +
            "\n" +
            "\n" +
            "\n" +
            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
            "    <tbody><tr>\n" +
            "      <td height=\"30\"><br></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
            "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
            "        \n" +
            "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Xin chào [[name]],</p>" +
            "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Đơn hàng của quý khách có mã <span style=\"font-weight: bold;\">[[orderId]]</span> đã được giao thành công.</p>" +
            "            <p>Cảm quý khách.</p>" +
            "        \n" +
            "      </td>\n" +
            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
            "    </tr>\n" +
            "    <tr>\n" +
            "      <td height=\"30\"><br></td>\n" +
            "    </tr>\n" +
            "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
            "\n" +
            "</div></div>\n";

    MimeMessage message = mailSender.createMimeMessage();
    MimeMessageHelper helper = new MimeMessageHelper(message);

    helper.setFrom(fromAddress, senderName);
    helper.setTo(toAddress);
    helper.setSubject(subject);

    content = content.replace("[[name]]", order.getReceiverName());
    content = content.replace("[[orderId]]", order.getId().toString());

//    String verifyURL = siteURL + "/api/v1/order/verify?code=" + order.getVerificationCode();
    String verifyURL = "http://localhost/order/verify?code=" + order.getVerificationCode();
    content = content.replace("[[URL]]", verifyURL);


    helper.setText(content, true);

    mailSender.send(message);
  }
}
