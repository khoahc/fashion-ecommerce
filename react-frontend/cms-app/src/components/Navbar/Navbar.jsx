// import "./Navbar.css";

import { useNavigate } from "react-router-dom";
import useToken from "../../utils/useToken";

const Navbar = () => {

  const navigate = useNavigate();
  
  const { removeToken } = useToken();

  const logout = () => {
    removeToken();
    navigate('.login');
  }


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
          <div className="navbar-item dropdown has-divider">
            <a href="/#" className="navbar-link">
              <span className="icon">
                <i className="mdi mdi-menu"></i>
              </span>
              <span>Sample Menu</span>
              <span className="icon">
                <i className="mdi mdi-chevron-down"></i>
              </span>
            </a>
            <div className="navbar-dropdown">
              <a href="profile.html" className="navbar-item">
                <span className="icon">
                  <i className="mdi mdi-account"></i>
                </span>
                <span>My Profile</span>
              </a>
              <a href="/#" className="navbar-item">
                <span className="icon">
                  <i className="mdi mdi-settings"></i>
                </span>
                <span>Settings</span>
              </a>
              <a href="/#" className="navbar-item">
                <span className="icon">
                  <i className="mdi mdi-email"></i>
                </span>
                <span>Messages</span>
              </a>
              <hr className="navbar-divider"></hr>
              <a href="/#" className="navbar-item">
                <span className="icon">
                  <i className="mdi mdi-logout"></i>
                </span>
                <span>Đăng xuất</span>
              </a>
            </div>
          </div>
          <div className="navbar-item dropdown has-divider has-user-avatar">
            <a href="/#" className="navbar-link">
              <div className="user-avatar">
                <img
                  src="https://avatars.dicebear.com/v2/initials/john-doe.svg"
                  alt="John Doe"
                  className="rounded-full"
                ></img>
              </div>
              <div className="is-user-name">
                <span>John Doe</span>
              </div>
              <span className="icon">
                <i className="mdi mdi-chevron-down"></i>
              </span>
            </a>
            <div className="navbar-dropdown">
              <a
                href="profile.html"
                className="navbar-item --set-active-profile-html"
              >
                <span className="icon">
                  <i className="mdi mdi-account"></i>
                </span>
                <span>My Profile</span>
              </a>
              <a href="/#" className="navbar-item">
                <span className="icon">
                  <i className="mdi mdi-settings"></i>
                </span>
                <span>Settings</span>
              </a>
              <a href="/#" className="navbar-item">
                <span className="icon">
                  <i className="mdi mdi-email"></i>
                </span>
                <span>Messages</span>
              </a>
              <hr className="navbar-divider"></hr>
              <a href="/#" className="navbar-item">
                <span className="icon">
                  <i className="mdi mdi-logout"></i>
                </span>
                <span>Log Out</span>
              </a>
            </div>
          </div>
          <button onClick={logout}
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
