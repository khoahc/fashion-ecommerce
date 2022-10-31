import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import clsx from "clsx";
import {
  TextField,
  Box,
  Autocomplete,
  Radio,
  FormControlLabel,
  RadioGroup,
} from "@mui/material";
import { orange, brown } from "@mui/material/colors";

import styles from "./Checkout.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";
import Button from "../../components/Button";
import ProductCheckout from "../../components/ProductCheckout";
import Grid from "../../components/Grid/Grid";

const Checkout = () => {
  //validation
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const location = useLocation();
  console.log(location.state);
  const [productsCheckout, setProductsCheckout] = useState(location.state);

  const initialTotalProducts = () => {
    let totalProducts = 0;
    productsCheckout.map((item) => {
      totalProducts += item.count;
    });
    return totalProducts;
  };

  const initialTotalPrice = () => {
    let totalPrice = 0;
    productsCheckout.map((item) => {
      totalPrice += item.price * item.count;
    });
    return totalPrice;
  };

  const [totalProducts, setTotalProducts] = useState(initialTotalProducts);

  const [totalPrice, setTotalPrice] = useState(initialTotalPrice);

  // textInput for coupon
  const textInput = useRef(null);

  const [inputHasValue, setInputHasValue] = useState(false);

  //handle onchange (show, hide) coupon input
  const handleOnChangeInput = () => {
    let value = textInput.current.value;
    value !== "" ? setInputHasValue(true) : setInputHasValue(false);
  };

  return (
    <>
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
                  label="Họ"
                  type="text"
                  size="medium"
                  fullWidth
                  {...register("lastName", {
                    required: "Họ không được rỗng!",
                    pattern: {
                      value:
                        /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/,
                      message: "Họ không hợp lệ!",
                    },
                  })}
                  error={!!errors?.lastName}
                  helperText={errors?.lastName ? errors.lastName.message : null}
                />
              </div>
              <div className={clsx(styles.item2)}>
                <TextField
                  required
                  id="outlined-password-input"
                  label="Tên"
                  type="text"
                  size="medium"
                  fullWidth
                  {...register("firstName", {
                    required: "Tên không được rỗng!",
                    pattern: {
                      value:
                        /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/,
                      message: "Tên không hợp lệ!",
                    },
                  })}
                  error={!!errors?.firstName}
                  helperText={
                    errors?.firstName ? errors.firstName.message : null
                  }
                />
              </div>
              <div className={clsx(styles.item3)}>
                <TextField
                  required
                  id="outlined-password-input"
                  label="Số điện thoại"
                  type="text"
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
                  options={[]}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
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
                <Autocomplete
                  id="country-select-demo"
                  options={[]}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
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
              </div>
              <div className={clsx(styles.item7)}>
                <Autocomplete
                  id="country-select-demo"
                  options={[]}
                  autoHighlight
                  getOptionLabel={(option) => option.label}
                  renderOption={(props, option) => (
                    <Box
                      component="li"
                      sx={{ "& > img": { mr: 2, flexShrink: 0 } }}
                      {...props}
                    >
                      {option.label} ({option.code}) +{option.phone}
                    </Box>
                  )}
                  renderInput={(params) => (
                    <TextField
                      {...params}
                      label="Xã/Thị trấn"
                      inputProps={{
                        ...params.inputProps,
                        autoComplete: "ward", // disable autocomplete and autofill
                      }}
                      {...register("ward", {
                        required: "Xã/Thị trấn không được rỗng!",
                      })}
                      error={!!errors?.ward}
                      helperText={errors?.ward ? errors.ward.message : null}
                    />
                  )}
                />
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
              <span className="uppercase">Phí ship</span> <span>0 đ</span>
            </div>
            <div className="mY-1 flex-row flex-center font-weight-bold">
              <span className="uppercase">Tổng</span>{" "}
              <span>{numberWithCommas(Number(totalPrice))} đ</span>
            </div>
          </div>

          <div className="flex-column flex-gap-1 py-2">
            <div className={clsx(styles.couponInput)}>
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
            )}
            <form onSubmit={handleSubmit(onSubmit)}>
              <Button
                type="submit"
                onClick={""}
                backgroundColor="black"
                color="white"
                radius="3"
                fontWeight="3"
                size="5"
                width="100"
              >
                Đặt hàng
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
