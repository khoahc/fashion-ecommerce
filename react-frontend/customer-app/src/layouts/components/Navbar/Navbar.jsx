import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import Logo from "../../../assets/images/logo_dark.png";
import * as catalogCategory from "../../../services/catalogCategory";

const Navbar = () => {
  let navigate = useNavigate();
  const { pathname } = useLocation();

  const [categoryData, setCategoryData] = useState([]);

  const activeNav = categoryData.findIndex((e) => "/c/" + e.slug === pathname);

  const [scrollDirection, setScrollDirection] = useState(null);

  const cartItems = useSelector((state) => state.cartItems.value);

  useEffect(() => {
    catalogCategory
      .getAllRootCategory()
      .then((data) => {
        if (data.status === "OK") {
          setCategoryData(data.data);
          console.log("categoryData :>> ", categoryData);
        } else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    let lastScrollY = window.pageYOffset;

    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (
        direction !== scrollDirection &&
        (scrollY - lastScrollY > 10 || scrollY - lastScrollY < -10)
      ) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };
    window.addEventListener("scroll", updateScrollDirection); // add event listener
    return () => {
      window.removeEventListener("scroll", updateScrollDirection); // clean up
    };
  }, [scrollDirection]);

  const handleSearch = (e) => {
    e.key === "Enter" &&
      e.target.value !== "" &&
      navigate(`/search?keyword=${e.target.value}`);
  };
  const menuLeft = useRef(null);

  const menuToggle = () => menuLeft.current.classList.toggle("active");
  return (
    <div className={`navbar ${scrollDirection === "down" ? "hide" : "show"}`}>
      <div className="flex-row flex-row-right white">
        <div className="navbar__top flex-row flex-gap-1">
          <Link
            className="py-1 px-1 font-weight-3 font-size-0-85"
            to={"/order-tracker"}
          >
            {" "}
            <span>trình theo dõi đơn hàng</span>{" "}
          </Link>
          {/* <Link className="py-1 font-weight-3 font-size-0-85" to={"/login"}>
            {" "}
            <span>đăng nhập</span>{" "}
          </Link>
          <Link className="py-1 font-weight-3 font-size-0-85" to={"/register"}>
            {" "}
            <span>đăng ký</span>{" "}
          </Link> */}
        </div>
      </div>
      <div className="container mb-1">
        <Link to="/">
          <img className="navbar__logo" src={Logo} alt="logo"></img>
        </Link>

        <div className="navbar__menu">
          <div className="navbar__menu__left" ref={menuLeft}>
            <div className="navbar__menu__left__close" onClick={menuToggle}>
              <i className="bx bx-chevron-left"></i>
            </div>
            {categoryData !== null &&
              categoryData.map((item, index) => (
                <div
                  key={index}
                  className={`navbar__menu__item navbar__menu__left__item ${
                    index === activeNav ? "active" : ""
                  }`}
                  onClick={menuToggle}
                >
                  <Link to={"/c/" + item.slug}>
                    <span>{item.name}</span>
                  </Link>
                </div>
              ))}
          </div>
          <div className="navbar__menu__mobile-toggle" onClick={menuToggle}>
            <i className="bx bx-menu-alt-left"></i>
          </div>
          <div className="header__menu__right">
            <div className="navbar__items">
              <div className="navbar__items__item navbar__items__item__search">
                <i className="bx bx-search bx-sm"></i>
                <input
                  type="search"
                  placeholder="Tìm kiếm"
                  onKeyPress={handleSearch}
                />
              </div>
              {/* <div className="navbar__items__item">
            <Link to="/login">
              <i className="bx bx-user bx-sm"></i>
            </Link>
          </div> */}
              <div className="navbar__items__item cart">
                <Link to="/cart">
                  <i className="bx bx-shopping-bag bx-sm"></i>
                  <span className="notification">{cartItems.length}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
