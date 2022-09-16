import React from "react";
import { Link, useLocation } from "react-router-dom";
import categoryData from "../assets/fake-data/category";
import logo from "../assets/images/logo_dark.png";

const Navbar = () => {
  const { pathname } = useLocation();
  const activeNav = categoryData.findIndex(
    (e) => "/" + e.categorySlug === pathname
  );
  return (
    <div className="navbar">
      <div className="container">
        <Link to="/">
          <img className="navbar__logo" src={logo} alt="logo"></img>
        </Link>

        <div className="navbar__menu">
          {categoryData.map((item, index) => (
            <div
              key={index}
              className={`navbar__menu__item ${
                index === activeNav ? "active" : ""
              }`}
            >
              <Link to={"/" + item.categorySlug}>
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
            <i className="bx bx-user bx-sm"></i>
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
