import LoadingButton from "@mui/lab/LoadingButton";
import {
  Autocomplete,
  FormControlLabel,
  Radio,
  RadioGroup,
  TextField
} from "@mui/material";
import { brown, common, grey, orange } from "@mui/material/colors";
import clsx from "clsx";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Grid from "../../components/Grid/Grid";
import ProductCheckout from "../../components/ProductCheckout";
import * as address from "../../services/address";
import * as order from "../../services/order";
import numberWithCommas from "../../utils/numberWithCommas";
import styles from "./Checkout.module.scss";

const Checkout = () => {
  //validation form

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const initialTotalProducts = () => {
    let totalProducts = 0;

    productsCheckout === null
      ? navigate(`/`)
      : productsCheckout.map((item) => {
          totalProducts += item.count;
        });
    return totalProducts;
  };

  const initialTotalPrice = () => {
    let totalPrice = 0;
    productsCheckout === null
      ? navigate(`/`)
      : productsCheckout.map((item) => {
          totalPrice += item.price * item.count;
        });
    return totalPrice;
  };

  let navigate = useNavigate();

  //get ProductsCheckout from state
  const location = useLocation();
  const [productsCheckout, setProductsCheckout] = useState(location.state);

  const [totalProducts, setTotalProducts] = useState(initialTotalProducts);

  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  const [shipCost, setShipCost] = useState(0);

  const [shipTime, setShipTime] = useState(0);

  const [showDistrict, setShowDistrict] = useState(false);

  const [showWard, setShowWard] = useState(false);

  const [province, setProvince] = useState([]);

  const [district, setDistrict] = useState([]);

  const [ward, setWard] = useState([]);

  const [selectedProvince, setSelectedProvince] = useState("");

  const [selectedDistrict, setSelectedDistrict] = useState("");

  const [loading, setLoading] = useState(false);

  // textInput for coupon
  const textInput = useRef(null);

  const [inputHasValue, setInputHasValue] = useState(false);

  //handle onchange (show, hide) coupon input
  const handleOnChangeInput = () => {
    let value = textInput.current.value;
    value !== "" ? setInputHasValue(true) : setInputHasValue(false);
  };

  //when province option change, we will show district
  const handleChangeProvince = (event, value) => {
    setShowDistrict(true);
    value !== null ? setSelectedProvince(value) : selectedProvince("");
  };

  //when district option change, we will show ward
  const handleChangeDistrict = (event, value) => {
    setShowWard(true);
    value !== null ? setSelectedDistrict(value) : setSelectedDistrict("");
  };

  //when province option change, we will show district
  const handleChangeWard = (event, value) => {
    value.shipCost !== null ? setShipCost(value.shipCost) : setShipCost(0);
    value.shipTime !== null ? setShipTime(value.shipTime) : setShipCost(0);
  };

  useEffect(() => {
    productsCheckout === null
      ? navigate(`/`)
      : Promise.all([
          address
            .getAllProvince()
            .then((data) => {
              if (data.status === "OK") {
                setProvince(data.data);
              } else {
                return Promise.reject(new Error(data.message));
              }
            })
            .catch((error) => {
              console.log(error);
            }),
        ]);
  }, []);

  useEffect(() => {
    address
      .getDistrictsByProvinceId(selectedProvince.id)
      .then((data) => {
        if (data.status === "OK") {
          setDistrict(data.data);
        } else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedProvince]);

  useEffect(() => {
    address
      .getWardsByDistrictId(selectedDistrict.id)
      .then((data) => {
        if (data.status === "OK") {
          setWard(data.data);
        } else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [selectedDistrict]);

  const notify = (type, message) => {
    type === 1
      ? toast.success(message, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      : toast.warn(message, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
  };

  //when click order
  const onSubmit = (data) => {
    setLoading(true);
    const dataPost = {
      ...data,
      products: productsCheckout,
      shipCost: shipCost,
      totalPrice: totalPrice,
    };
    console.log(JSON.stringify(dataPost, null, 2) + " dataPost");

    //post order
    order
      .postOrder(dataPost)
      .then((response) => {
        navigate("/order/verify");
        notify(1, "Đặt hàng thành công");
        console.log(response);
      })
      .catch(function (error) {
        notify(0, "Đặt hàng thất bại!");
        console.log(error);
      });
  };

  return (
    <>
      {productsCheckout !== null && (
        <div className={clsx(styles.container)}>
          <div className={clsx(styles.left)}>
            <div className={clsx(styles.title)}>
              <h3 className="font-weight-5 font-spacing-1 uppercase">
                Địa chỉ giao hàng
              </h3>
            </div>
            <form>
              <div className={clsx(styles.gridContainer)}>
                <div className={clsx(styles.item1)}>
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Họ và tên"
                    type="text"
                    size="medium"
                    fullWidth
                    {...register("fullName", {
                      required: "Họ và tên không được rỗng!",
                      pattern: {
                        value:
                          /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/,
                        message: "Họ và tên không hợp lệ!",
                      },
                    })}
                    error={!!errors?.fullName}
                    helperText={
                      errors?.fullName ? errors.fullName.message : null
                    }
                  />
                </div>

                <div className={clsx(styles.item3)}>
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Số điện thoại"
                    type="tel"
                    size="medium"
                    name="phone"
                    fullWidth
                    {...register("phoneNumber", {
                      required: "Số điện thoại không được rỗng!",
                      pattern: {
                        value: /[0]{1}[0-9]{9}/,
                        message: "Số điện thoại không hợp lệ!",
                      },
                    })}
                    error={!!errors?.phoneNumber}
                    helperText={
                      errors?.phoneNumber ? errors.phoneNumber.message : null
                    }
                  />
                </div>

                <div className={clsx(styles.item4)}>
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Email"
                    type="email"
                    size="medium"
                    fullWidth
                    {...register("email", {
                      required: "Email không được rỗng!",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Địa chỉ email không hợp lệ!",
                      },
                    })}
                    error={!!errors?.email}
                    helperText={errors?.email ? errors.email.message : null}
                  />
                </div>

                <div className={clsx(styles.item5)}>
                  <Autocomplete
                    id="country-select-demo"
                    options={province}
                    autoHighlight
                    defaultValue=""
                    getOptionLabel={(option) => option.name || ""}
                    isOptionEqualToValue={(option, value) =>
                      value === undefined ||
                      value === "" ||
                      option.id === value.id
                    }
                    onChange={handleChangeProvince}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label="Tỉnh/Thành phố"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "tinh", // disable autocomplete and autofill
                        }}
                        {...register("province", {
                          required: "Tỉnh/Thành phố không được rỗng!",
                        })}
                        error={!!errors?.province}
                        helperText={
                          errors?.province ? errors.province.message : null
                        }
                      />
                    )}
                  />
                </div>
                <div className={clsx(styles.item6)}>
                  {showDistrict && (
                    <Autocomplete
                      id="country-select-demo"
                      options={district}
                      autoHighlight
                      onChange={handleChangeDistrict}
                      defaultValue=""
                      isOptionEqualToValue={(option, value) =>
                        value === undefined ||
                        value === "" ||
                        option.id === value.id
                      }
                      getOptionLabel={(option) => option.name || ""}
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Quận/Huyện"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "district", // disable autocomplete and autofill
                          }}
                          {...register("district", {
                            required: "Quận/Huyện không được rỗng!",
                          })}
                          error={!!errors?.district}
                          helperText={
                            errors?.district ? errors.district.message : null
                          }
                        />
                      )}
                    />
                  )}
                </div>
                <div className={clsx(styles.item7)}>
                  {showWard && (
                    <Autocomplete
                      id="country-select-demo"
                      options={ward}
                      onChange={handleChangeWard}
                      defaultValue=""
                      autoHighlight
                      getOptionLabel={(option) => option.name || ""}
                      isOptionEqualToValue={(option, value) =>
                        value === undefined ||
                        value === "" ||
                        option.id === value.id
                      }
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          label="Xã/Phường"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "ward", // disable autocomplete and autofill
                          }}
                          {...register("ward", {
                            required: "Xã/Phường không được rỗng!",
                          })}
                          error={!!errors?.ward}
                          helperText={errors?.ward ? errors.ward.message : null}
                        />
                      )}
                    />
                  )}
                </div>

                <div className={clsx(styles.item8)}>
                  <TextField
                    required
                    id="outlined-password-input"
                    label="Địa chỉ cụ thể"
                    type="text"
                    size="medium"
                    fullWidth
                    {...register("address", {
                      required: "Địa chỉ cụ thể không được rỗng!",
                      pattern: {
                        value:
                          /[1-9aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/,
                        message: "Địa chỉ cụ thể không hợp lệ!",
                      },
                    })}
                    error={!!errors?.address}
                    helperText={errors?.address ? errors.address.message : null}
                  />
                </div>
              </div>
            </form>
            {/* product list */}
            <div className="mY-2">
              <div className={clsx(styles.title)}>
                <h3 className="font-weight-5 font-spacing-1 uppercase">
                  Sản phẩm đặt mua
                </h3>
              </div>
              <Grid col={2} mdCol={1} gap={10}>
                {productsCheckout.map((item, index) => (
                  <ProductCheckout
                    key={index}
                    data={item}
                    count={item.count}
                    onChange={setProductsCheckout}
                  />
                ))}
              </Grid>
            </div>

            <div className="">
              <div className={clsx(styles.title)}>
                <h3 className="font-weight-5 font-spacing-1 uppercase">
                  Phương thức thanh toán
                </h3>
              </div>
              <div className="">
                <div className="">
                  <RadioGroup
                    aria-labelledby="demo-radio-buttons-group-label"
                    defaultValue="cod"
                    name="radio-buttons-group"
                    {...register("paymentMethod")}
                  >
                    <FormControlLabel
                      value="cod"
                      control={
                        <Radio
                          sx={{
                            color: brown[200],
                            "&.Mui-checked": {
                              color: orange[700],
                            },
                          }}
                        />
                      }
                      label={
                        <div className="flex-row flex-center flex-gap-1">
                          <img
                            src="https://img.ltwebstatic.com/images2_pi/2018/06/06/15282728403108279621.webp"
                            alt=""
                            style={{ maxWidth: "50px" }}
                          />

                          <p className="font-weight-4">
                            Thanh toán khi giao hàng
                          </p>
                        </div>
                      }
                    />
                  </RadioGroup>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer
            position="bottom-right"
            autoClose={2000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light"
          />
          {/* RIGHT cointainer */}
          <div className={clsx(styles.right)}>
            <div className={clsx(styles.title)}>
              <h3 className="font-weight-5 font-spacing-1 uppercase">
                Tóm tắt đơn hàng
              </h3>
            </div>

            <div className="mY-1 mX-2">
              <div className="mY-1 flex-row flex-center font-weight-4">
                <span className="uppercase">
                  {Number(totalProducts)} sản phẩm
                </span>{" "}
                <span>{numberWithCommas(Number(totalPrice))} đ</span>
              </div>
              <div className="mY-1 flex-row flex-center font-weight-4">
                <span className="uppercase">Phí ship</span>{" "}
                <span>{numberWithCommas(Number(shipCost))} đ</span>
              </div>

              <div className="mY-1 flex-row flex-center font-weight-4">
                <span className="uppercase">Số ngày vận chuyển dự kiến</span>{" "}
                <span>{numberWithCommas(Number(shipTime))} ngày</span>
              </div>

              <div className="mY-1 flex-row flex-center font-weight-bold">
                <span className="uppercase">Tổng</span>{" "}
                <span>{numberWithCommas(Number(totalPrice + shipCost))} đ</span>
              </div>
            </div>

            <div className="flex-column flex-gap-1 py-2">
              {/* <div className={clsx(styles.couponInput)}>
              <input
                ref={textInput}
                onChange={handleOnChangeInput}
                type="text"
                placeholder="Nhập mã khuyến mãi của bạn"
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                  }
                }}
              />
            </div>

            {inputHasValue && (
              <Button
                onClick={""}
                backgroundColor="white"
                color="black"
                border="border"
                radius="3"
                fontWeight="3"
                size="5"
              >
                Áp dụng
              </Button>
            )} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <LoadingButton
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "50px",
                    fontSize: "1.15rem",
                    letterSpacing: "1px",
                    textTransform: "none",
                    fontWeight: "400",
                    backgroundColor: common.black,
                    borderRadius: "30px",
                    "&:hover": {
                      backgroundColor: grey[800],
                    },
                  }}
                  size="small"
                  loading={loading}
                  variant="contained"
                >
                  Đặt hàng
                </LoadingButton>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Checkout;
