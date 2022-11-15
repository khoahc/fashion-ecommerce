import "./navbar.css";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetails } from "../../redux/user/userAction";
import { logout } from "../../redux/user/userSlice";
import { Link } from "react-router-dom";

const Navbar = () => {
  const { userInfo, userToken } = useSelector((state) => state.user)
  const dispatch = useDispatch()

  useEffect(() => {
    if (userToken) {
      dispatch(getUserDetails())
    }
  }, [userToken, dispatch])

  const handleLogout = () => {
    dispatch(logout());
  };

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
                  src={userInfo && userInfo.photo ? userInfo.photo : 'https://res.cloudinary.com/hauhc/image/upload/v1667738857/lizi/users/default_najhrt.webp'}
                  alt={userInfo && userInfo.firstName}
                  className="rounded-full object-cover h-full w-full"
                ></img>
              </div>
              <div className="is-user-name">
                <span>{userInfo && userInfo.firstName}</span>
              </div>
              <span className="icon">
                <i className="mdi mdi-chevron-down"></i>
              </span>
            </div>
            <div className="navbar-dropdown user-actions">
              <Link
                href="#"
                className="navbar-item --set-active-profile-html"
              >
                <span className="icon">
                  <i className="mdi mdi-account"></i>
                </span>
                <span>Trang Cá nhân</span>
              </Link>
              <hr className="navbar-divider"></hr>
              <button
                className="navbar-item"
                onClick={handleLogout}
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
            onClick={handleLogout}
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
