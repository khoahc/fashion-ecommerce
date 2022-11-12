import clsx from "clsx";
import React from "react";
import { NumericFormat } from "react-number-format";
import StarRatings from "react-star-ratings";

import styles from "./Product.module.scss";

const Product = (props) => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.image)}>
        <img src={props.product.colors[0].image} alt="image product" />
      </div>

      <div className={clsx(styles.content)}>
        <div className={clsx(styles.name, "mb-1")}>
          <p>{props.product.name}</p>
        </div>
        <div className="mb-1">
          <StarRatings
            rating={props.product.rate}
            starDimension="20px"
            starRatedColor="#F2C94C"
          />
        </div>
        <div className={clsx(styles.price)}>
          <NumericFormat
            value={props.product.price}
            type="text"
            valueIsNumericString={true}
            decimalSeparator=","
            thousandSeparator="."
            displayType="text"
            suffix=" đ"
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
