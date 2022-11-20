import { LoadingButton } from "@mui/lab";
import { Button } from "@mui/material";
import { common } from "@mui/material/colors";
import React from "react";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const NotifyVerifyOrder = () => {
  let navigate = useNavigate();

  return (
    <div className="container">
      <div className="center text-center mY-10 m-autoX">
        <h1 className="mb-1">Cảm ơn bạn đã đặt hàng!</h1>
        <h2 className="mb-3">Đơn hàng đang được chúng tôi xác nhận</h2>
        {/* <h2 className="font-weight-4">Vui lòng xác nhận đơn hàng qua email.</h2> */}

        <Button
          type="submit"
          endIcon={<FaChevronRight color="white" size={16} />}
          onClick={() => { navigate("/order-tracker")}}
          sx={{
            width: "300px",
            height: "50px",
            fontSize: "1.15rem",
            letterSpacing: "1px",
            textTransform: "none",
            fontWeight: "400",
            backgroundColor: common.black,
            borderRadius: "0px",
            boxShadow: "0.25px 0.25px 1px 5px #fff, 1px 1px 0px 5px #111",
            "&:hover": {
              backgroundColor: common.black,
              color: "#F2C94C",
              boxShadow: "2px 2px 1px 5px #fff, 3px 3px 0px 5px #333",
            },
          }}
          size="medium"
          variant="contained"
        >
          <span className="uppercase font-weight-4">Theo dõi đơn hàng</span>
        </Button>
      </div>
    </div>
  );
};

export default NotifyVerifyOrder;
