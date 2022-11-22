import { Link, useLocation } from "react-router-dom";

const Aside = () => {

  const pathName = useLocation().pathname;
  
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
          {/* <li className={ pathName === '/' ? 'active' : '' }>
            <Link to={"/"}>
              <span className="icon">
                <i className="mdi mdi-view-dashboard-outline"></i>
              </span>
              <span className="menu-item-label">Dashboard</span>
            </Link>
          </li> */}
          <li className={ pathName === '/' || pathName.startsWith('/category') ? 'active' : '' }>
            <Link to={"/category"}>
              <span className="icon">
                <i className="mdi mdi-hanger"></i>
              </span>
              <span className="menu-item-label">Loại sản phẩm</span>
            </Link>
          </li>
          <li className={ pathName.startsWith('/product') ? 'active' : '' }>
            <Link to={"/product"}>
              <span className="icon">
                <i className="mdi mdi-shopping-outline "></i>
              </span>
              <span className="menu-item-label">Sản phẩm</span>
            </Link>
          </li>
          <li className={ pathName.startsWith('/order') ? 'active' : '' }>
            <Link to={"/order"}>
              <span className="icon">
                <i className="mdi mdi-receipt-text-outline"></i>
              </span>
              <span className="menu-item-label">Đơn hàng</span>
            </Link>
          </li>
          {/* <li className={ pathName.startsWith('/voucher') ? 'active' : '' }>
            <Link to={"/voucher"}>
              <span className="icon">
                <i className="mdi mdi-brightness-percent"></i>
              </span>
              <span className="menu-item-label">Voucher</span>
            </Link>
          </li> */}
          {/* <li className={ pathName.startsWith('/delivery') ? 'active' : '' }>
            <Link to={"/delivery"}>
              <span className="icon">
                <i className="mdi mdi-truck-delivery"></i>
              </span>
              <span className="menu-item-label">Giao hàng</span>
            </Link>
          </li> */}
          <li className={ pathName.startsWith('/user') ? 'active' : '' }>
            <Link to={"/user"}>
              <span className="icon">
                <i className="mdi mdi-account-tie"></i>
              </span>
              <span className="menu-item-label">Nhân viên</span>
            </Link>
          </li>
          {/* <li className={ pathName.startsWith('/customer') ? 'active' : '' }>
            <Link to={"/customer"}>
              <span className="icon">
                <i className="mdi mdi-account-group"></i>
              </span>
              <span className="menu-item-label">Khách hàng</span>
            </Link>
          </li> */}
          <li className={ pathName.startsWith('/statis') ? 'active' : '' }>
            <Link to={"/statis"}>
              <span className="icon">
                <i className="mdi mdi-chart-bar"></i>
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
