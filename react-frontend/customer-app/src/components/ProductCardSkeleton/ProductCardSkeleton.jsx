import PropTypes from "prop-types";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import clsx from "clsx";

import styles from "./ProductCardSkeleton.module.scss";

const ProductCardSkeleton = (props) => {
  return (
    <SkeletonTheme baseColor="#ccc" highlightColor="#aaa">
      <div className={clsx(styles.container)}>
        <div className={clsx(styles.image)}>
          <Skeleton height={300} />
        </div>
        <div className={clsx(styles.info)}>
          <Skeleton height={20} />
          <Skeleton height={20} />
          <Skeleton height={20} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default ProductCardSkeleton;
