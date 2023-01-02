import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ROLES } from "../../permisions/Permissions";

const Aside = () => {
  const { userInfo } = useSelector((state) => state.user);
  const pathName = useLocation().pathname;
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState(null);

  const [menuManagement, setMenuManagement] = useState([
    {
      name: "Loại sản phẩm",
      url: "/category",
      icon: "mdi-hanger",
    },
    {
      name: "Sản phẩm",
      url: "/product",
      icon: "mdi-shopping-outline",
    },
    // {
    //   name: "Voucher",
    //   url: "/voucher",
    //   icon: "mdi-brightness-percent",
    // },
    {
      name: "Đơn hàng",
      url: "/order",
      icon: "mdi-receipt-text-outline",
    },
    {
      name: "Giao hàng",
      url: "/delivery",
      icon: "mdi-truck",
    },
    // {
    //   name: "Đánh giá",
    //   url: "/review",
    //   icon: "mdi-comment",
    // },
    {
      name: "Nhân viên",
      url: "/user",
      icon: "mdi-account-tie",
    },
    // {
    //   name: "Khách hàng",
    //   url: "/customer",
    //   icon: "mdi-account-group",
    // },
  ]);

  const isPermission = () => {
    for (let p of permissions) {
      if (pathName.includes(p)) {
        return true;
      }
    }
    return false;
  }

  useEffect(() => {
    if (userInfo && userInfo.roles) {
      const p = [];
      for (let r of ROLES) {
        for (let u_r of userInfo.roles) {
          if (r.name === u_r.name) {
            p.push(...r.permissions);
            console.log(p);
          }
        }
      }
      setPermissions(p.filter((item, pos) => p.indexOf(item) === pos));
    }
  }, [userInfo]);

  useEffect(() => {
    console.log(pathName);
    if (permissions && !isPermission()) {
      console.log("Not permission!");
      navigate(permissions[0]);
    }
  }, [permissions, pathName]);

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
          <h3 className="pl-4 pt-4 text-slate-400 uppercase">Quản lý</h3>
          {permissions &&
            menuManagement
              .filter((mn) => permissions.includes(mn.url))
              .map((mn) => (
                <li
                  className={pathName.startsWith(`${mn.url}`) ? "active" : ""}
                >
                  <Link to={mn.url}>
                    <span className="icon">
                      <i className={`mdi ${mn.icon}`}></i>
                    </span>
                    <span className="menu-item-label">{mn.name}</span>
                  </Link>
                </li>
              ))}
          {permissions && permissions.includes("/statis") && (
            <>
              <h3 className="pl-4 pt-4 text-slate-400 uppercase">Thống kê</h3>
              <li
                className={
                  pathName === "/" || pathName.startsWith("/statis")
                    ? "active"
                    : ""
                }
              >
                <Link to={"/statis"}>
                  <span className="icon">
                    <i className="mdi mdi-chart-bar"></i>
                  </span>
                  <span className="menu-item-label">Thống kê</span>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </aside>
  );
};

export default Aside;
