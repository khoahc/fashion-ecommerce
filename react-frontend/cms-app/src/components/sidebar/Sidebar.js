import './sidebar.scss'

import DashboardIcon from '@mui/icons-material/Dashboard';
import BarChartIcon from '@mui/icons-material/BarChart';
import CheckroomIcon from '@mui/icons-material/Checkroom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import DiscountIcon from '@mui/icons-material/Discount';
import AutoAwesomeMotionIcon from '@mui/icons-material/AutoAwesomeMotion';
import GroupsIcon from '@mui/icons-material/Groups';
import GroupIcon from '@mui/icons-material/Group';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <div className="logo">Lizi Admin</div>
            <div className="currentUser">User name</div>
        </div>
        <div className="center">
            <ul>
                <li>
                    <DashboardIcon className="icon" />
                    <span>Trang chủ</span>
                </li>
                <li>
                    <BarChartIcon className="icon" />
                    <span>Thống kê</span>
                </li>
                <li>
                    <CheckroomIcon className="icon" />
                    <span>Sản phẩm</span>
                </li>
                <li>
                    <ReceiptIcon className="icon" />
                    <span>Đơn hàng</span>
                </li>
                <li>
                    <LocalShippingIcon className="icon" />
                    <span>Giao hàng</span>
                </li>
                <li>
                    <AutoAwesomeMotionIcon className="icon" />
                    <span>Loại quần áo</span>
                </li>
                <li>
                    <DiscountIcon className="icon" />
                    <span>Voucher</span>
                </li>
                <li>
                    <GroupsIcon className="icon" />
                    <span>Khách hàng</span>
                </li>
                <li>
                    <GroupIcon className="icon" />
                    <span>Nhân viên</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <ul>
                <li>
                    <PersonIcon className="icon" />
                    <span>Tài khoản</span>
                </li>
                <li>
                    <LogoutIcon className="icon" />
                    <span>Đăng xuất</span>
                </li>
            </ul>

            <span>Copyright Lizi VN</span>
        </div>
    </div>
  )
}

export default Sidebar