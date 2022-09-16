import React from "react";
import { Link, useLocation } from 'react-router-dom'

const Navbar = () => {
  return (
    <div>
      <div className="container">
        <span className="logo"></span>
        <div className="nav__menu">
          
        </div>
        <div className="nav__items">
          <div className="nav__menu__item">
            <i className="bx bx-search"></i>
          </div>
          <div className="nav__menu__item">
            <i className="bx bx-user"></i>
          </div>
          <div className="nav__menu__item">
            <Link to="/cart">
              <i className="bx bx-shopping-bag"></i>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
