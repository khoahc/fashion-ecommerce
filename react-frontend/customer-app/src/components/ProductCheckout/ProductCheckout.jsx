import React, { useState, useEffect, useContext } from "react";
import clsx from "clsx";
import { Link } from "react-router-dom";

import styles from "./ProductCheckout.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";

const ProductCheckout = (props) => {

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.image)}>
        <Link
          to={`/p/${props.data.slugProduct}/?color=${props.data.slugColor}&size=${props.data.size}`}
        >
          <img src={props.data.image} alt="" />
        </Link>
      </div>

      <div className={clsx(styles.info)}>
        <div className="font-weight-5 m-1">
          <Link
            to={`/p/${props.data.slugProduct}/?color=${props.data.slugColor}&size=${props.data.size}`}
          >{`${props.data.name} - ${props.data.color}`}</Link>
        </div>
        <div className="font-weight-3 m-1">
          {numberWithCommas(Number(props.data.price)) + " đ"}
        </div>

        {/* SIZE */}
        <div className="flex-row flex-center m-1">
          <h4 className="font-weight-4 mr-1">Size: {props.data.size}</h4>
        </div>

        {/* QUANTITY */}
        <div className="flex-row flex-gap-1 flex-center-align-items m-1">
          <h4 className="font-weight-4 mr-1">Số lượng {props.data.count}</h4>
        </div>
      </div>
    </div>
  );
};

export default ProductCheckout;
