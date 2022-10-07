import "./featured.scss"
import "react-circular-progressbar/dist/styles.css"

import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

import { CircularProgressbar } from "react-circular-progressbar"

const Featured = () => {
  return (
    <div className="featured">
        <div className="top">
            <h1 className="title">Total Revenue</h1>
            <MoreVertOutlinedIcon fontSize="small" />
        </div>
        <div className="bottom">
            <div className="featuredChart">
                <CircularProgressbar value={70} text={"70%"} strokeWidth={5} />
            </div>
            <div className="title">Total sales made today</div>
            <div className="amount">$420</div>
            <div className="desc">
                Previous transactions processing. Last payments may not be included.
            </div>
            <div className="summary">
                <div className="item">
                    <div className="itemTitle">Target</div>
                    <div className="itemResult">
                        <KeyboardArrowDownIcon fontSize="small" />
                        <div className="resultAmount">$12.4k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Week</div>
                    <div className="itemResult">
                        <KeyboardArrowDownIcon fontSize="small" />
                        <div className="resultAmount">$12.4k</div>
                    </div>
                </div>
                <div className="item">
                    <div className="itemTitle">Last Month</div>
                    <div className="itemResult negative">
                        <KeyboardArrowUpIcon fontSize="small" />
                        <div className="resultAmount">$12.4k</div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Featured