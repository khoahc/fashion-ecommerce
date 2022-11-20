import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../../assets/images/logo_dark.png";

const Footer = () => {
  return (
    <div className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-content__wrap">
            <div className="footer-content__title">
              <Link to="/">
                <img className="navbar__logo" src={Logo} alt="logo"></img>
              </Link>
            </div>

            <div className="footer-content__item">
              <p>Thông tin công ty</p>
            </div>
            <div className="footer-content__info">
              <div>
                <p>Số 1 Võ Văn Ngân, Tp HCM</p>
              </div>
              <div>
                <p>0987666888</p>
              </div>
              <div>
                <p>lizicompany@gmail.com</p>
              </div>
            </div>
          </div>

          <div className="footer-content__wrap">
            <div className="footer-content__title">
              <h3>Hỗ trợ khách hàng</h3>
            </div>
            <div className="footer-content__item">
              <p>Phí vận chuyển</p>
            </div>
            <div className="footer-content__item">
              <p>Trả hàng</p>
            </div>
            <div className="footer-content__item">
              <p>Hướng dẫn kích thước</p>
            </div>
            <div className="footer-content__item">
              <p>Trách nhiệm xã hội</p>
            </div>
          </div>

          <div className="footer-content__wrap">
            <div className="footer-content__title">
              <h3>Dịch vụ khách hàng</h3>
            </div>
            <div className="footer-content__item">
              <p>Liên hệ với chúng tôi</p>
            </div>
            <div className="footer-content__item">
              <p>Phương thức thanh toán</p>
            </div>
          </div>

          <div className="footer-content__wrap">
            <div className="footer-content__title">
              <h3>Kết nối với chúng tôi</h3>
            </div>
            <div className="footer-content__social">
              <div className="footer-content__item">
                <a href="">
                  <i className="bx bxl-facebook bx-sm white"></i>
                </a>
              </div>
              <div className="footer-content__item">
                <a href="">
                  <i className="bx bxl-instagram-alt bx-sm white"></i>
                </a>
              </div>
              <div className="footer-content__item">
                <a href="">
                  <i className="bx bxl-youtube bx-sm white"></i>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="footer__legal">
          <p>© 2022 - CÔNG TY TNHH LIZI VN</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
