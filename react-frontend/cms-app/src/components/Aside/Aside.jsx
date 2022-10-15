import { Link } from "react-router-dom";

const Aside = () => {
  return (
    <aside className="aside is-placed-left is-expanded">
      <div className="aside-tools">
        <div>
          Admin <b className="font-black">Lizi</b>
        </div>
      </div>
      <div className="menu is-menu-main">
        <ul className="menu-list">
          {/* <li className="active"> */}
          <li className="">
            <Link to={"/"}>
              <span className="icon">
                <i class="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Dashboard</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/category"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Loại sản phẩm</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/product"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Sản phẩm</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/order"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Đơn hàng</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/voucher"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Voucher</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/delivery"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Giao hàng</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/user"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Nhân viên</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/customer"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Khách hàng</span>
            </Link>
          </li>
          <li className="">
            <Link to={"/statis"}>
              <span className="icon">
                <i className="mdi mdi-desktop-mac"></i>
              </span>
              <span className="menu-item-label">Thống kê</span>
            </Link>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
