package com.lizi.customer.service.implement;

import com.lizi.common.entity.Order;
import com.lizi.common.entity.OrderDetail;
import com.lizi.common.entity.OrderStatus;
import com.lizi.common.entity.OrderTrack;
import com.lizi.customer.dto.request.OrderRequestDTO;
import com.lizi.customer.dto.request.ProductCheckoutRequestDTO;
import com.lizi.customer.dto.response.OrderTrackResponseDTO;
import com.lizi.customer.dto.response.OrderTrackerResponseDTO;
import com.lizi.customer.dto.response.ProductCartResponseDTO;
import com.lizi.customer.exception.ResourceNotFoundException;
import com.lizi.customer.mapper.OrderDetailMapper;
import com.lizi.customer.mapper.OrderMapper;
import com.lizi.customer.mapper.OrderTrackMapper;
import com.lizi.customer.repository.OrderDetailRepository;
import com.lizi.customer.repository.OrderRepository;
import com.lizi.customer.repository.OrderTrackRepository;
import com.lizi.customer.repository.ProductOptionRepository;
import com.lizi.customer.service.OrderService;
import com.lizi.customer.service.ProductOptionService;
import com.lizi.customer.util.DateFormat;
import net.bytebuddy.utility.RandomString;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class OrderServiceImpl implements OrderService {
  @Autowired
  private OrderRepository orderRepository;

  @Autowired
  ProductOptionService productOptionService;

  @Autowired
  ProductOptionRepository productOptionRepository;

  @Autowired
  OrderDetailRepository orderDetailRepository;

  @Autowired
  OrderTrackRepository orderTrackRepository;
  @Autowired
  private JavaMailSender mailSender;

  @Override
  public String addOrder(OrderRequestDTO orderRequestDTO, String siteURL) throws MessagingException, UnsupportedEncodingException {
    Order order = OrderMapper.INSTANCE.orderRequestDTOToOrder(orderRequestDTO);
    String randomCode = RandomString.make(64);
    order.setVerificationCode(randomCode);
    Order orderSaved = orderRepository.save(order);

    Set<ProductCheckoutRequestDTO> listProductCheckoutRequestDTO = orderRequestDTO.getProducts();

    Order finalOrderSaved1 = orderSaved;
    listProductCheckoutRequestDTO.forEach((item) -> {
      OrderDetail orderDetail = OrderDetailMapper.INSTANCE.productCheckoutRequestDTOToOrderDetail(item);
      Long idProductOption = productOptionService.getIdProductOptionBySlugProductAndColorAndSize(item.getSlugProduct(), item.getSlugColor(), item.getSize());
      orderDetail.setProductOption(productOptionRepository.findById(idProductOption).get());
      orderDetail.setOrder(finalOrderSaved1);
      orderDetailRepository.save(orderDetail);
    });

    //add orderTrack
    OrderTrack orderTrack = OrderTrack.builder().status(OrderStatus.NEW).order(orderSaved).notes(OrderStatus.NEW.defaultDescription()).build();
    orderTrackRepository.save(orderTrack);

    sendVerificationOrder(orderSaved, siteURL);
    return orderSaved.getId();
  }

  private void sendVerificationOrder(Order order, String siteURL)
          throws MessagingException, UnsupportedEncodingException {
    String toAddress = order.getEmail();
    String fromAddress = "phongnha0167@gmail.com";
    String senderName = "Lizi";
//    String subject = "[LIZI] - X??c nh???n ????n h??ng c???a b???n";
//    String content =
//    "<div style=\"font-family:Helvetica,Arial,sans-serif;font-size:16px;margin:0;color:#0b0c0c\">\n" +
//            "\n" +
//            "<span style=\"display:none;font-size:1px;color:#fff;max-height:0\"></span>\n" +
//            "\n" +
//            "  <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;min-width:100%;width:100%!important\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\">\n" +
//            "    <tbody><tr>\n" +
//            "      <td width=\"100%\" height=\"53\" bgcolor=\"#0b0c0c\">\n" +
//            "        \n" +
//            "        <table role=\"presentation\" width=\"100%\" style=\"border-collapse:collapse;max-width:580px\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" align=\"center\">\n" +
//            "          <tbody><tr>\n" +
//            "            <td width=\"70\" bgcolor=\"#0b0c0c\" valign=\"middle\">\n" +
//            "                <table role=\"presentation\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;margin:auto\">\n" +
//            "                  <tbody><tr>\n" +
//            "                    <td style=\"font-size:28px;line-height:1.315789474;Margin-top:4px\">\n" +
//            "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">X??c nh???n ????n h??ng</span>\n" +
//            "                    </td>\n" +
//            "                  </tr>\n" +
//            "                </tbody></table>\n" +
//            "              </a>\n" +
//            "            </td>\n" +
//            "          </tr>\n" +
//            "        </tbody></table>\n" +
//            "        \n" +
//            "      </td>\n" +
//            "    </tr>\n" +
//            "  </tbody></table>\n" +
//            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
//            "    <tbody><tr>\n" +
//            "      <td width=\"10\" height=\"10\" valign=\"middle\"></td>\n" +
//            "      <td>\n" +
//            "        \n" +
//            "                <table role=\"presentation\" width=\"100%\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse\">\n" +
//            "                  <tbody><tr>\n" +
//            "                    <td bgcolor=\"#1D70B8\" width=\"100%\" height=\"10\"></td>\n" +
//            "                  </tr>\n" +
//            "                </tbody></table>\n" +
//            "        \n" +
//            "      </td>\n" +
//            "      <td width=\"10\" valign=\"middle\" height=\"10\"></td>\n" +
//            "    </tr>\n" +
//            "  </tbody></table>\n" +
//            "\n" +
//            "\n" +
//            "\n" +
//            "  <table role=\"presentation\" class=\"m_-6186904992287805515content\" align=\"center\" cellpadding=\"0\" cellspacing=\"0\" border=\"0\" style=\"border-collapse:collapse;max-width:580px;width:100%!important\" width=\"100%\">\n" +
//            "    <tbody><tr>\n" +
//            "      <td height=\"30\"><br></td>\n" +
//            "    </tr>\n" +
//            "    <tr>\n" +
//            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
//            "      <td style=\"font-family:Helvetica,Arial,sans-serif;font-size:19px;line-height:1.315789474;max-width:560px\">\n" +
//            "        \n" +
//            "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Xin ch??o [[name]],</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">C???m ??n b???n ???? ?????t mua s???n ph???m c???a ch??ng t??i.</p> " +
//            "            <p>M?? ????n h??ng c???a b???n l??: <span style=\"font-weight: bold;\">[[orderId]]</span></p>\n" +
//            "            <p>Vui l??ng click v??o link d?????i ????? x??c nh???n ????n h??ng c???a b???n.</p><blockquote style=\"Margin:0 0 20px 0;border-left:10px solid #b1b4b6;padding:15px 0 0.1px 15px;font-size:19px;line-height:25px\"><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\"> <a href=\"[[URL]]\">X??c nh???n ????n h??ng</a> </p></blockquote>\n Link s??? h???t h???n sau 15 ph??t. <p>C???m ??n b???n</p>" +
//            "        \n" +
//            "      </td>\n" +
//            "      <td width=\"10\" valign=\"middle\"><br></td>\n" +
//            "    </tr>\n" +
//            "    <tr>\n" +
//            "      <td height=\"30\"><br></td>\n" +
//            "    </tr>\n" +
//            "  </tbody></table><div class=\"yj6qo\"></div><div class=\"adL\">\n" +
//            "\n" +
//            "</div></div>\n";
    String subject = "[LIZI] - Th??ng tin ????n h??ng c???a b???n";
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
                    "                      <span style=\"font-family:Helvetica,Arial,sans-serif;font-weight:700;color:#ffffff;text-decoration:none;vertical-align:top;display:inline-block\">X??c nh???n ????n h??ng</span>\n" +
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
                    "            <p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">Xin ch??o [[name]],</p><p style=\"Margin:0 0 20px 0;font-size:19px;line-height:25px;color:#0b0c0c\">C???m ??n b???n ???? ?????t mua s???n ph???m c???a ch??ng t??i.</p> " +
                    "            <p>M?? ????n h??ng c???a b???n l??: <span style=\"font-weight: bold;\">[[orderId]]</span></p>\n" +
                    "            <p>C???m ??n b???n</p>" +
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

  @Override
  public boolean verify(String verificationCode) {
    Order order = orderRepository.findByVerificationCode(verificationCode).get();
    if (order == null) {
      return false;
    } else {
      orderTrackRepository.save(OrderTrack.builder().order(order).status(OrderStatus.NEW).notes(OrderStatus.NEW.defaultDescription()).build());

      orderRepository.enableOrder(order.getId());
      //create new track
      return true;
    }
  }

  @Override
  public boolean checkOrderByOrderIdAndEmail(String orderId, String email) {
    Optional<Order> order = orderRepository.findByIdAndEmail(orderId, email);
    return order.isPresent();
  }

  @Override
  public OrderTrackerResponseDTO getOrderTrackerByOrderIdAndEmail(String orderId, String email) {
    if(checkOrderByOrderIdAndEmail(orderId, email)) {
      Optional<Order> order = orderRepository.findById(orderId);
      List<ProductCartResponseDTO> products = orderDetailRepository.findAllProductOptionByOrderId(orderId);
      List<OrderTrack> orderTrackEntityList = orderTrackRepository.findByOrderId(orderId);

      //Convert orderTrackEntityList to orderTracks
      List<OrderTrackResponseDTO> orderTracks = new ArrayList<OrderTrackResponseDTO>();
      orderTrackEntityList.forEach(orderTrackEntity -> {
        OrderTrackResponseDTO orderTrackResponseDTO = OrderTrackMapper.INSTANCE.orderTrackToOrderTrackResponseDTO(orderTrackEntity);
        orderTracks.add(orderTrackResponseDTO);
      });

      return OrderTrackerResponseDTO.builder().orderId(order.get().getId())
              .orderTime(DateFormat.DateToString(order.get().getOrderTime()))
              .totalPrice(order.get().getTotalPrice())
              .shipCost(order.get().getShipCost())
              .products(products)
              .orderTracks(orderTracks).build();
    } else {
      throw new ResourceNotFoundException("M?? ????n h??ng ho???c email sai!");
    }
  }

}
