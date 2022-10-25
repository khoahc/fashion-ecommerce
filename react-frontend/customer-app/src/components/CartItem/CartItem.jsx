import React, { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Select from "react-select";

import { useDispatch } from "react-redux";
// import { updateItem, removeItem } from '../redux/shopping-cart/cartItemsSlide'
import styles from "./CartItem.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";
import { Link } from "react-router-dom";

const CartItem = (props) => {
  const optionQuantity = [
    { value: "1", label: "1" },
    { value: "2", label: "2" },
    { value: "3", label: "3" },
    { value: "4", label: "4" },
    { value: "5", label: "5" },
    { value: "6", label: "6" },
  ];

  const dispatch = useDispatch();

  const itemRef = useRef(null);

  const [selectedOption, setSelectedOption] = useState([]);
  const [item, setItem] = useState(props.item);
  const [count, setCount] = useState(props.item.count);

  useEffect(() => {
    setItem(props.item);
    setCount(props.item.count);
  }, [props.item]);

  // const handleSelectCount = (e)

  // const updateQuantity = (opt) => {
  //     if (opt === '+') {
  //         dispatch(updateItem({...item, quantity: quantity + 1}))
  //     }
  //     if (opt === '-') {
  //         dispatch(updateItem({...item, quantity: quantity - 1 === 0 ? 1 : quantity - 1}))
  //     }
  // }

  // const updateCartItem = () => {
  //     dispatch(updateItem({...item, quantity: quantity}))
  // }

  const removeCartItem = () => {
    console.log("removeCartItem");
    // dispatch(removeItem(item))
  };

  return (
    <div className={clsx(styles.container)} ref={itemRef}>
      <div className={clsx(styles.image)}>
        <img src={item.image} alt="" />        
      </div>

      <div className={clsx(styles.info)}>
        <div className="font-weight-5 mb-2">
          <Link to={`/p/${item.slugProduct}/?color=${item.slugColor}&size=${item.size}`}>{`${item.name} - ${item.color}`}</Link>
        </div>
        <div className="font-weight-3 mb-3">
          {numberWithCommas(Number(item.price)) + " đ"}
        </div>

        <div className="flex-row flex-gap-1">
          {/* SIZE */}
          <div className="flex-row flex-center">
            <h4 className="font-weight-4 mr-1">Size: {item.size}</h4>            
          </div>

          {/* QUANTITY */}
          <div className="flex-row flex-center">
            <h4 className="font-weight-4 mr-1">Số lượng</h4>
            <div style={{ maxWidth: "80px" }}>
              <Select                
                isSearchable={false}
                placeholder={"Số lượng"}
                onChange={""}
                defaultValue={{ value: [count], label: [count] }}
                options={optionQuantity}
                theme={(theme) => ({
                  ...theme,
                  borderRadius: 0,
                  colors: {
                    ...theme.colors,
                    primary25: "orange",
                    primary: "black",
                  },
                })}
              />
            </div>
          </div>
        </div>
      </div>

      <div className={clsx(styles.exit)}>
        <i className="bx bx-trash" onClick={() => removeCartItem()}></i>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.object,
};

export default CartItem;
