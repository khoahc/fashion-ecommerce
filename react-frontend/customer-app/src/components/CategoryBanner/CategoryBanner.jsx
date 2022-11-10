import clsx from "clsx";
import React from "react";
import { Link } from "react-router-dom";

import styles from "./CategoryBanner.module.scss";

const CategoryBanner = (props) => {
  return (
    <div className={clsx(styles.container)}>
      <div
        className={clsx({
          [styles.content]: true,
          [styles.contentRight]: !(props.index % 2),
        })}
      >
        <h4 className={clsx(styles.title)}>{"Shop " + props.category.name}</h4>
        <h6 className={clsx(styles.slogan)}>Thể hiển bản lĩnh </h6>
        <Link
          className={clsx(styles.btnDetail)}
          to={"/c/" + props.category.slug}
        >
          Xem chi tiết
        </Link>
      </div>
      <div>
        <img src={props.category.image} alt="image-category-banner" />
      </div>
    </div>
  );
};

export default CategoryBanner;
