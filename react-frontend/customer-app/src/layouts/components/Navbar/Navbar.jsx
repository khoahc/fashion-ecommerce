import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import categoryData from "../../../assets/fake-data/category";
import Logo from "../../../assets/images/logo_dark.png";

const Navbar = () => {
  const { pathname } = useLocation();
  const activeNav = categoryData.findIndex((e) => "/c/" + e.slug === pathname);

  const [scrollDirection, setScrollDirection] = useState(null);

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

  return (
    <div className={`navbar ${ scrollDirection === "down" ? "hide" : "show"}`}>
      <div className="container">
        <Link to="/">
          <img className="navbar__logo" src={Logo} alt="logo"></img>
        </Link>

        <div className="navbar__menu">
          {categoryData.map((item, index) => (
            <div
              key={index}
              className={`navbar__menu__item ${
                index === activeNav ? "active" : ""
              }`}
            >
              <Link to={"/c/" + item.slug}>
                <span>{item.name}</span>
              </Link>
            </div>
          ))}
        </div>

        <div className="navbar__items">
          <div className="navbar__items__item navbar__items__item__search">
            <i className="bx bx-search bx-sm"></i>
            <input
              type="search"
              placeholder="Tìm kiếm"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                }
              }}
            />
          </div>
          <div className="navbar__items__item">
            <Link to="/login">
              <i className="bx bx-user bx-sm"></i>
            </Link>
          </div>
          <div className="navbar__items__item">
            <Link to="/cart">
              <i className="bx bx-shopping-bag bx-sm"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;