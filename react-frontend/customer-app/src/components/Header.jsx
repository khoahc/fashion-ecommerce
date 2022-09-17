import React from "react";
import { Link, Outlet } from "react-router-dom";
import Logo from "../assets/images/LIZI.png";
import SloganText from "../assets/images/fashionstyle-text.png";
import Year from "../assets/images/2022.png";
import Banner from "../assets/images/banner1.png";

const Header = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header__content">
          <div>
            <div className="header__content__slogan">
              <img src={SloganText} alt="sologan" />
            </div>
          </div>

          <div className="header__content__wrap1">
            <div className="header__content__wrap1__logo">
              <img src={Logo} alt="logo" />
            </div>
            <div className="header__content__wrap2">
              <div className="header__content__wrap2__year">
                <img src={Year} alt="year" />
              </div>
              <div className="header__content__wrap2__btn">
                <Link to="/">
                  Mua ngay
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="header__left" />
        <div className="header__right">
          <img src={Banner} alt="img-banner" />
        </div>
      </div>
      <Outlet/>
    </div>   
  );
};

export default Header;
