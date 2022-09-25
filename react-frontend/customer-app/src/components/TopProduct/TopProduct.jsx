import React from "react";
import clsx from 'clsx';
import Carousel from "../Carousel";
import styles from "./TopProduct.module.scss";

function TopProduct(props) {
  return (
    <div className={clsx(styles.topProduct)}>
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.title)}>
          <h2>{props.title}</h2>
        </div>
        <Carousel />
      </div>
    </div>
  );
}

export default TopProduct;
