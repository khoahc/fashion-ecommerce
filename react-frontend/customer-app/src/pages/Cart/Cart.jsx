import React, { useEffect, useState, useCallback, useRef } from "react";
import clsx from "clsx";
import { useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { FormControlLabel, Checkbox } from "@mui/material";
import { orange, brown } from "@mui/material/colors";

import CartItem from "../../components/CartItem";
import Button from "../../components/Button";
import styles from "./Cart.module.scss";
import * as productOption from "../../services/productOption";

import numberWithCommas from "../../utils/numberWithCommas";

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

  const [cartProductsChose, setCartProductsChose] = useState([]);

  const [totalProducts, setTotalProducts] = useState(0);

  const [totalPrice, setTotalPrice] = useState(0);

  const [isCheckedChooseAll, setIsCheckedChooseAll] = useState(false);

  const initialCheckList = () => {
    let arr = [];
    cartItems.forEach((item, index) => {
      arr.push({ key: index, checked: false });
    });
    return arr;
  };

  const [checkedList, setCheckedList] = useState(initialCheckList);

  const handleChangeChooseAll = (event) => {
    setIsCheckedChooseAll(() => !isCheckedChooseAll);

    if (!isCheckedChooseAll === true) {
      setCartProducts(cartProducts.map((cart) => setEnabled(cart, true)));
    } else {
      setCartProducts(cartProducts.map((cart) => setEnabled(cart, false)));
    }
  };

  // // when checkedList change, if 'checked' has the same value in checkList, set setIsCheckedChooseAll
  // useEffect(() => {
  //   let checkAll = false;

  //   for (let i = 0; i < checkedList.length - 1; i++) {
  //     console.log(JSON.stringify(checkedList) + "11111111");
  //     if (checkedList.at(i).checked !== checkedList.at(i++).checked) {
  //       checkAll = false;
  //       break;
  //     }
  //     checkAll = true;
  //   }

  //   checkAll && setIsCheckedChooseAll(checkedList.at(0).checked);
  // }, [checkedList]);

  useEffect(() => {
    //set value all of checkedList to 'event.target.checked'
    setCheckedList(() => {
      let newCheckedList = [];
      checkedList.forEach((item, index) => {
        item = { key: item.key, checked: isCheckedChooseAll };
        newCheckedList.push(item);
      });
      return newCheckedList;
    });
  }, [isCheckedChooseAll]);

  //handle onchange (show, hide) coupon input
  const handleOnChangeInput = () => {
    let value = textInput.current.value;
    value !== "" ? setInputHasValue(true) : setInputHasValue(false);
  };

  const setCount = (cartItem) => {
    let cart = cartItems.filter(
      (item) =>
        cartItem.slugProduct === item.slugProduct &&
        cartItem.size === item.size &&
        cartItem.slugColor === item.slugColor
    );
    return {
      ...cartItem,
      count: cart.at(0).count,
      enabled: cart.at(0).enabled,
    };
  };

  // !enabled
  const setEnabled = (cartItem, isEnabled) => {
    let cart = cartItems.filter(
      (item) =>
        cartItem.slugProduct === item.slugProduct &&
        cartItem.size === item.size &&
        cartItem.slugColor === item.slugColor
    );
    return {
      ...cartItem,
      enabled: isEnabled,
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
                  cartItems.find(
                    ({ slugProduct }) => item.slugProduct === slugProduct
                  ) &&
                  cartItems.find(({ size }) => item.size === size) &&
                  cartItems.find(
                    ({ slugColor }) => item.slugColor === slugColor
                  )
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

  useEffect(() => {
    setCartProductsChose(cartProducts.filter((item) => item.enabled));
  }, [cartProducts]);

  const updateTotal = useCallback(() => {
    setTotalPrice(() =>
      cartProducts.reduce(
        (total, item) =>
          item.enabled
            ? total + Number(item.count) * Number(item.price)
            : total + 0,
        0
      )
    );

    setTotalProducts(() =>
      cartProducts.reduce(
        (total, item) =>
          item.enabled ? total + Number(item.count) : total + 0,
        0
      )
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
        {/* list cart */}
        {cartProducts.map((item, index) => (
          <CartItem
            item={item}
            id={index}
            key={index}
            checkList={checkedList}
            // onChangeChoose={setCheckedList}
          />
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

          <FormControlLabel
            label="Chọn tất cả"
            control={
              <Checkbox
                checked={isCheckedChooseAll}
                onChange={handleChangeChooseAll}
                sx={{
                  color: brown[200],
                  "&.Mui-checked": {
                    color: orange[700],
                  },
                }}
              />
            }
          />

          <h2 className="uppercase mt-2">Tóm tắt đơn hàng</h2>
        </div>
        <div className="mY-1 mX-2">
          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">{Number(totalProducts)} sản phẩm</span>{" "}
            <span>{numberWithCommas(Number(totalPrice))} đ</span>
          </div>
          {/* <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">Phí ship</span> <span>0 đ</span>
          </div> */}
          <div className="mY-1 flex-row flex-center font-weight-bold">
            <span className="uppercase">Tổng</span>{" "}
            <span>{numberWithCommas(Number(totalPrice))} đ</span>
          </div>

          <p>Dụng mã giảm giá trong bước tiếp theo.</p>
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
        
          <Button
            onClick={() => {
              navigate("/checkout", { state: cartProductsChose });
            }}
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
