import React, { useEffect, useState, useCallback, useRef } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";

import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import styles from "./Cart.module.scss";
import productData from "../../assets/fake-data/products";
import * as productOption from "../../services/productOption";

import numberWithCommas from "../../utils/numberWithCommas";
import { set } from "../../redux/product-modal/productModalSlice";

const Cart = () => {
  let navigate = useNavigate();
  const goToPreviousPath = () => {
    navigate(-1);
  };
  const cartItems = useSelector((state) => state.cartItems.value);

  // textInput must be declared here so the ref can refer to it
  const textInput = useRef(null);

  const [inputHasValue, setInputHasValue] = useState(false);

  const [cartProducts, setCartProducts] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  //handle onchange (show, hide) coupon input
  const handleOnChangeInput = () => {
    let value = textInput.current.value;
    value != "" ? setInputHasValue(true) : setInputHasValue(false);
  };

  const setCount = (cartItem) => {
    let cart = cartItems.filter(
      (item) =>
        cartItem.slugProduct === item.slug &&
        cartItem.size === item.size &&
        cartItem.slugColor === item.color
    );

    return {
      ...cartItem,
      count: cart[0].count,
    };
  };

  useEffect(() => {
    productOption
      .getAllProductOptionForCart()
      .then((data) => {
        if (data.data.status === "OK") {
          setCartProducts(() =>
            data.data.data
              .filter(
                (item) =>
                  cartItems.find(({ slug }) => item.slugProduct === slug) &&
                  cartItems.find(({ size }) => item.size === size) &&
                  cartItems.find(({ color }) => item.slugColor === color)
              )
              .map((cart) => setCount(cart))
          );
        } else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  }, [cartItems]);

  const updateTotal = useCallback(() => {
    setTotalPrice(() =>
      cartProducts.reduce(
        (total, item) => total + Number(item.count) * Number(item.price),
        0
      )
    );
    console.log(cartProducts);
    console.log(totalPrice);
    setTotalProducts(() =>
      cartProducts.reduce((total, item) => total + Number(item.count), 0)
    );
  });

  useEffect(() => {
    updateTotal();
  }, [updateTotal]);

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.left)}>
        <div className="uppercase">
          <h2 className="font-weight-5 mb-1">Giỏ hàng của bạn</h2>
          <h4 className="font-weight-4">
            Tổng cộng ({totalProducts} sản phẩm){" "}
            {numberWithCommas(Number(totalPrice))} ₫
          </h4>
        </div>
        {cartProducts.map((item, index) => (
          <CartItem item={item} key={index} />
        ))}
      </div>

      <div className={clsx(styles.right)}>
        <div>
          <Button
            custom="w-100"
            onClick={goToPreviousPath}
            backgroundColor="white"
            color="black"
            border="border"
            radius="3"
            fontWeight="3"
            size="5"
          >
            Tiếp tục mua hàng
          </Button>
        </div>

        <div className="mY-2 mX-1">
          <p>Bạn đang có {totalProducts} sản phẩm trong giỏ hàng</p>
          <h2 className="uppercase mt-2">Tóm tắt đơn hàng</h2>
        </div>
        <div className="mY-1 mX-2">
          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">{Number(totalProducts)} sản phẩm</span>{" "}
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
  );
};

export default Cart;
