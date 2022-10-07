import "./sidebar.scss"
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import StoreOutlinedIcon from '@mui/icons-material/StoreOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import InsertChartOutlinedIcon from '@mui/icons-material/InsertChartOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import PsychologyOutlinedIcon from '@mui/icons-material/PsychologyOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import ExitToAppOutlinedIcon from '@mui/icons-material/ExitToAppOutlined';

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <div className="top">
            <span className="logo">Lizi Admin</span>
        </div>

        <hr />

        <div className="center">
            <ul>
                <p className="title">MAIN</p>
                <li>
                    <DashboardIcon className="icon" />
                    <span>Dashboard</span>
                </li>
                <p className="title">LISTS</p>
                <li>
                    <PersonOutlineOutlinedIcon className="icon" />
                    <span>Users</span>
                </li>
                <li>
                    <StoreOutlinedIcon className="icon" />
                    <span>Products</span>
                </li>
                <li>
                    <CreditCardOutlinedIcon className="icon" />
                    <span>Orders</span>
                </li>
                <li>
                    <LocalShippingOutlinedIcon className="icon" />
                    <span>Dilivery</span>
                </li>
                <p className="title">USEFUL</p>
                <li>
                    <InsertChartOutlinedIcon className="icon" />
                    <span>Stats</span>
                </li>
                <li>
                    <NotificationsNoneOutlinedIcon className="icon" />
                    <span>Notifications</span>
                </li>
                <p className="title">SERVICE</p>
                <li>
                    <SettingsSystemDaydreamOutlinedIcon className="icon" />
                    <span>System health</span>
                </li>
                <li>
                    <PsychologyOutlinedIcon className="icon" />
                    <span>Logs</span>
                </li>
                <p className="title">USER</p>
                <li>
                    <AccountCircleOutlinedIcon className="icon" />
                    <span>Profile</span>
                </li>
                <li>
                    <SettingsOutlinedIcon className="icon" />
                    <span>Settings</span>
                </li>
                <li>
                    <ExitToAppOutlinedIcon className="icon" />
                    <span>Logout</span>
                </li>
            </ul>
        </div>
        <div className="bottom">
            <div className="colorOption"></div>
            <div className="colorOption"></div>
            <div className="colorOption"></div>
        </div>
    </div>
  )
}

export default Sidebar