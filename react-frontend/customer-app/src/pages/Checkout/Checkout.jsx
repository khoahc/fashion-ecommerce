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

  const [modalIsOpen, setModalIsOpen] = useState(false);

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
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      : toast.warn(message, {
          position: "bottom-left",
          autoClose: 1000,
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
        notify(1, "?????t h??ng th??nh c??ng");
        navigate("/order/verify");    
        console.log(response);
      })
      .catch(function (error) {
        notify(0, "?????t h??ng th???t b???i!");
        // setModalIsOpen(true);
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
                ?????a ch??? giao h??ng
              </h3>
            </div>
            <form>
              <div className={clsx(styles.gridContainer)}>
                <div className={clsx(styles.item1)}>
                  <TextField
                    required
                    id="outlined-password-input"
                    label="H??? v?? t??n"
                    type="text"
                    size="medium"
                    fullWidth
                    {...register("fullName", {
                      required: "H??? v?? t??n kh??ng ???????c r???ng!",
                      pattern: {
                        value:
                          /[aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ]/,
                        message: "H??? v?? t??n kh??ng h???p l???!",
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
                    label="S??? ??i???n tho???i"
                    type="tel"
                    size="medium"
                    name="phone"
                    fullWidth
                    {...register("phoneNumber", {
                      required: "S??? ??i???n tho???i kh??ng ???????c r???ng!",
                      pattern: {
                        value: /[0]{1}[0-9]{9}/,
                        message: "S??? ??i???n tho???i kh??ng h???p l???!",
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
                      required: "Email kh??ng ???????c r???ng!",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "?????a ch??? email kh??ng h???p l???!",
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
                        label="T???nh/Th??nh ph???"
                        inputProps={{
                          ...params.inputProps,
                          autoComplete: "tinh", // disable autocomplete and autofill
                        }}
                        {...register("province", {
                          required: "T???nh/Th??nh ph??? kh??ng ???????c r???ng!",
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
                          label="Qu???n/Huy???n"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "district", // disable autocomplete and autofill
                          }}
                          {...register("district", {
                            required: "Qu???n/Huy???n kh??ng ???????c r???ng!",
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
                          label="X??/Ph?????ng"
                          inputProps={{
                            ...params.inputProps,
                            autoComplete: "ward", // disable autocomplete and autofill
                          }}
                          {...register("ward", {
                            required: "X??/Ph?????ng kh??ng ???????c r???ng!",
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
                    label="?????a ch??? c??? th???"
                    type="text"
                    size="medium"
                    fullWidth
                    {...register("address", {
                      required: "?????a ch??? c??? th??? kh??ng ???????c r???ng!",
                      pattern: {
                        value:
                          /[1-9aA????????????????????????????????????????????????????????????????????????????????????????????bBcCdD????eE????????????????????????????????????????????????????????????fFgGhHiI????????????????????????jJkKlLmMnNoO????????????????????????????????????????????????????????????????????????????????????????????pPqQrRsStTuU??????????????????????????????????????????????????????????vVwWxXyY????????????????????????????zZ]/,
                        message: "?????a ch??? c??? th??? kh??ng h???p l???!",
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
                  S???n ph???m ?????t mua
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
                  Ph????ng th???c thanh to??n
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
                            Thanh to??n khi giao h??ng
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
            autoClose={1000}
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
                T??m t???t ????n h??ng
              </h3>
            </div>

            <div className="mY-1 mX-2">
              <div className="mY-1 flex-row flex-center font-weight-4">
                <span className="uppercase">
                  {Number(totalProducts)} s???n ph???m
                </span>{" "}
                <span>{numberWithCommas(Number(totalPrice))} ??</span>
              </div>
              <div className="mY-1 flex-row flex-center font-weight-4">
                <span className="uppercase">Ph?? ship</span>{" "}
                <span>{numberWithCommas(Number(shipCost))} ??</span>
              </div>

              <div className="mY-1 flex-row flex-center font-weight-4">
                <span className="uppercase">S??? ng??y v???n chuy???n d??? ki???n</span>{" "}
                <span>{numberWithCommas(Number(shipTime))} ng??y</span>
              </div>

              <div className="mY-1 flex-row flex-center font-weight-bold">
                <span className="uppercase">T???ng</span>{" "}
                <span>{numberWithCommas(Number(totalPrice + shipCost))} ??</span>
              </div>
            </div>

            <div className="flex-column flex-gap-1 py-2">
              {/* <div className={clsx(styles.couponInput)}>
              <input
                ref={textInput}
                onChange={handleOnChangeInput}
                type="text"
                placeholder="Nh???p m?? khuy???n m??i c???a b???n"
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
                ??p d???ng
              </Button>
            )} */}
              <form onSubmit={handleSubmit(onSubmit)}>
                <LoadingButton
                  type="submit"
                  sx={{
                    width: "100%",
                    height: "50px",
                    fontSize: "1.15rem",
                    textTransform: "none",
                    fontWeight: "300",
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
                  ?????t h??ng
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
