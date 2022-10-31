import React, { useRef, useState } from "react";
import { useLocation } from "react-router-dom";
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

          <div className={clsx(styles.gridContainer)}>
            <div className={clsx(styles.item1)}>
              <TextField
                required
                id="outlined-password-input"
                label="Họ"
                type="text"
                size="medium"
                fullWidth
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
              />
            </div>
            <div className={clsx(styles.item4)}>
              {/* <TextField
                required
                id="outlined-password-input"
                label="Tỉnh/Thành phố"
                type="text"
                size="medium"
                fullWidth
              /> */}

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
                      autoComplete: "new-password", // disable autocomplete and autofill
                    }}
                  />
                )}
              />
            </div>
            <div className={clsx(styles.item5)}>
              <TextField
                required
                id="outlined-password-input"
                label="Quận/Huyện"
                type="text"
                size="medium"
                fullWidth
              />
            </div>
            <div className={clsx(styles.item6)}>
              <TextField
                required
                id="outlined-password-input"
                label="Xã/Thị trấn"
                type="text"
                size="medium"
                fullWidth
              />
            </div>
            <div className={clsx(styles.item7)}>
              <TextField
                required
                id="outlined-password-input"
                label="Địa chỉ cụ thể"
                type="text"
                size="medium"
                fullWidth
              />
            </div>
          </div>

         
            {/* product list */}
            <div className="mY-2">
              <div className={clsx(styles.title)}>
                <h3 className="font-weight-5 font-spacing-1 uppercase">
                  Sản phẩm đặt mua
                </h3>
              </div>
              <Grid col="2" mdCol="1" gap={10}>
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

            <Button
              onClick={""}
              backgroundColor="black"
              color="white"
              radius="3"
              fontWeight="3"
              size="5"
            >
              Đặt hàng
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
