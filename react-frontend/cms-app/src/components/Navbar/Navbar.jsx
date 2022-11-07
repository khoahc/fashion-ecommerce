import "./navbar.css";

import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import userApi from "../../services/axios/userApi";
import useToken from "../../utils/useToken";

const { getInfo } = userApi;

const Navbar = () => {
  const [firstName, setFirstName] = useState("");
  const [photo, setPhoto] = useState(
    "https://res.cloudinary.com/hauhc/image/upload/v1667738857/lizi/users/default_najhrt.webp"
  );
  const navigate = useNavigate();

  const { removeToken } = useToken();

  const logout = () => {
    removeToken();
    navigate("/login");
  };

  useEffect(() => {
    const getData = async () => {
      getInfo()
        .then((resp) => {
          if (resp.status !== "OK") {
            navigate("/login");
          }
          return resp.data;
        })
        .then((data) => {
          setFirstName(data.firstName);
          setPhoto(data.photo);
        });
    };

    getData();
  });

  return (
    <nav id="navbar-main" className="navbar is-fixed-top">
      <div className="navbar-brand">
        <a href="/#" className="navbar-item mobile-aside-button">
          <span className="icon">
            <i className="mdi mdi-forwardburger mdi-24px"></i>
          </span>
        </a>
        <div className="navbar-item">
          <div className="control">
            <input placeholder="Tìm kiếm..." className="input"></input>
          </div>
        </div>
      </div>
      <div className="navbar-brand is-right">
        <a
          href="/#"
          className="navbar-item --jb-navbar-menu-toggle"
          data-target="navbar-menu"
        >
          <span className="icon">
            <i className="mdi mdi-dots-vertical mdi-24px"></i>
          </span>
        </a>
      </div>
      <div className="navbar-menu" id="navbar-menu">
        <div className="navbar-end">
          <div className="navbar-item dropdown has-divider has-user-avatar">
            <div className="navbar-link">
              <div className="user-avatar">
                <img
                  src={photo}
                  alt={firstName}
                  className="rounded-full object-cover h-full w-full"
                ></img>
              </div>
              <div className="is-user-name">
                <span>{firstName}</span>
              </div>
              <span className="icon">
                <i className="mdi mdi-chevron-down"></i>
              </span>
            </div>
            <div className="navbar-dropdown user-actions">
              <a
                href="profile.html"
                className="navbar-item --set-active-profile-html"
              >
                <span className="icon">
                  <i className="mdi mdi-account"></i>
                </span>
                <span>Trang Cá nhân</span>
              </a>
              <hr className="navbar-divider"></hr>
              <button
                className="navbar-item"
                onClick={logout}
                title="Đăng xuất"
              >
                <span className="icon">
                  <i className="mdi mdi-logout"></i>
                </span>
                <span>Đăng xuất</span>
              </button>
            </div>
          </div>
          <button
            onClick={logout}
            title="Đăng xuất"
            className="navbar-item desktop-icon-only"
          >
            <span className="icon">
              <i className="mdi mdi-logout"></i>
            </span>
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
