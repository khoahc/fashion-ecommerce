import { LoadingButton } from "@mui/lab";
import { TextField } from "@mui/material";
import { common } from "@mui/material/colors";
import clsx from "clsx";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import styles from "./OrderTracker.module.scss";

const OrderTracker = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  //when click "Tra cuu"
  const onSubmit = (data) => {
  
    // setLoading(true);
    // const dataPost = {
    //   ...data,
    //   products: productsCheckout,
    //   shipCost: shipCost,
    //   totalPrice: totalPrice,
    // };
    // console.log(JSON.stringify(dataPost, null, 2) + " dataPost");

    // //post order
    // order
    //   .postOrder(dataPost)
    //   .then((response) => {
    //     navigate("/order/verify");
    //     notify(1, "Đặt hàng thành công");
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     notify(0, "Đặt hàng thất bại!");
    //     console.log(error);
    //   });

    navigate("/order-tracker-detail");

  };

  return (
    <div className={clsx(styles.container)}>
      <div className="uppercase font-weight-5 font-size-2">
        Theo dõi đơn hàng của bạn
      </div>
      <div className="flex flex-column flex-gap-2">
        <div className="">
          <TextField
            required
            id="outlined-password-input"
            label="Mã đơn hàng"
            type="text"
            size="medium"
            fullWidth
            {...register("orderId", {
              required: "Mã đơn hàng không được trống!",
              pattern: {
                value: /^[a-zA-Z0-9_.-]{32}$/,
                message: "Mã đơn hàng không hợp lệ!",
              },
            })}
            error={!!errors?.orderId}
            helperText={errors?.orderId ? errors.orderId.message : null}
          />
        </div>
        <div className="">
          <TextField
            required
            id="outlined-password-input"
            label="Email"
            type="email"
            size="medium"
            fullWidth
            {...register("email", {
              required: "Email không được trống!",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Địa chỉ email không hợp lệ!",
              },
            })}
            error={!!errors?.email}
            helperText={errors?.email ? errors.email.message : null}
          />
        </div>
      </div>
      <div className="">
        <form onSubmit={handleSubmit(onSubmit)}>
          <LoadingButton
            type="submit"
            endIcon={<FaChevronRight color="white" size={16} />}
            sx={{
              width: "150px",
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
            loading={loading}
            variant="contained"
          >
            <span className="uppercase font-weight-4">Tra cứu</span>
          </LoadingButton>
        </form>
      </div>
    </div>
  );
};

export default OrderTracker;
