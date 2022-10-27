import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { orange, brown } from "@mui/material/colors";
import { Checkbox, FormControlLabel } from "@mui/material";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

import {
  updateItem,
  removeItem,
} from "../../redux/shopping-cart/cartItemsSlide";
import styles from "./CartItem.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";
import Button from "../../components/Button";

const CartItem = (props) => {
  const dispatch = useDispatch();

  const itemRef = useRef(null);
  const checkedRef = useRef();

  const [item, setItem] = useState(props.item);
  const [count, setCount] = useState(props.item.count);

  useEffect(() => {
    setItem(props.item);
    setCount(props.item.count);
  }, [props.item]);

  const handleChangeCount = (opt) => {
    if (opt === "down") {
      count > 1 && updateCount(count - 1);
    } else if (opt === "up") {
      count < item.quantity && updateCount(count + 1);
    }
  };

  const handleRemoveCartItem = () => {
    dispatch(removeItem(item));
  };

  const updateCount = (count) => {
    dispatch(updateItem({ ...item, count: count }));
  };

  // choose checkbox

  useEffect(() => {
    dispatch(
      updateItem({ ...item, enabled: checkedRef.current.children[0].checked })
    );
    console.log(JSON.stringify(item) + " check all");
  }, [props.checkList[props.id].checked]);

  const handleChooseCartItem = (event) => {
    // props.onChangeChoose(() => {
    //   let newCheckList = props.checkList.filter(
    //     (item) => item.key !== props.id
    //   );

    //   newCheckList = [
    //     ...newCheckList,
    //     { key: props.id, checked: event.target.checked },
    //   ];

    //   console.log(JSON.stringify(newCheckList) + " new");
    //   return newCheckList.sort((a, b) =>
    //     a.key > b.key ? 1 : a.key < b.key ? -1 : 0
    //   );

    //   // dispatch(updateItem({ ...item, enabled: !item.enabled }));
    // });

    dispatch(updateItem({ ...item, enabled: !item.enabled }));

    console.log(JSON.stringify(item));
  };

  return (
    <div className={clsx(styles.container)} ref={itemRef}>
      {/* checkbox */}
      <div className="m-autoY ml-2">        
        <FormControlLabel 
          control={
            <Checkbox
              ref={checkedRef}
              checked={item.enabled || props.checkList[props.id].checked}
              onChange={handleChooseCartItem}
              sx={{
                color: brown[200],
                "&.Mui-checked": {
                  color: orange[700],
                },
              }}
            />
          }
        />
      </div>

      <div className={clsx(styles.image)}>
        <Link
          to={`/p/${item.slugProduct}/?color=${item.slugColor}&size=${item.size}`}
        >
          <img src={item.image} alt="" />
        </Link>
      </div>

      <div className={clsx(styles.info)}>
        <div className="font-weight-5 mb-2">
          <Link
            to={`/p/${item.slugProduct}/?color=${item.slugColor}&size=${item.size}`}
          >{`${item.name} - ${item.color}`}</Link>
        </div>
        <div className="font-weight-3 mb-2">
          {numberWithCommas(Number(item.price)) + " đ"}
        </div>

        {/* SIZE */}
        <div className="flex-row flex-center mb-1">
          <h4 className="font-weight-4 mr-1">Size: {item.size}</h4>
        </div>

        {/* QUANTITY */}
        <div className="flex-row flex-gap-1 flex-center-align-items">
          <h4 className="font-weight-4 mr-1">Số lượng</h4>
          <div className="flex-row flex-center ">
            <Button
              onClick={() => handleChangeCount("down")}
              backgroundColor="white"
              color="black"
              border="border"
              radius="4"
              fontWeight="3"
              size="3-5"
              paddingX="1"
              paddingY="1"
            >
              <IoIosRemove />
            </Button>
            <span className="mX-1">{count}</span>
            <Button
              onClick={() => handleChangeCount("up")}
              backgroundColor="white"
              color="black"
              border="border"
              radius="4"
              fontWeight="3"
              size="3-5"
              paddingX="1"
              paddingY="1"
            >
              <IoIosAdd />
            </Button>

            {/* <Select
                isSearchable={false}
                placeholder={"Số lượng"}
                onChange={handleSelectCount}
                defaultValue={{ value: [count], label: [count] }}
                // options={optionQuantity}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "orange",
                    primary: "black",
                  },
                })}
              /> */}
          </div>
        </div>
      </div>

      <div className={clsx(styles.exit)}>
        <i className="bx bx-trash" onClick={handleRemoveCartItem}></i>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
