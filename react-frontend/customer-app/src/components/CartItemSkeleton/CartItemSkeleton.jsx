import clsx from "clsx";
import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

import styles from "./CartItemSkeleton.module.scss";

const CartItemSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#ccc" highlightColor="#aaa">
      <div className={clsx(styles.container)}>
        {/* checkbox */}
        <div className="m-autoY ml-2">
          <Skeleton circle width={30} height={25} />
        </div>

        <div className={clsx(styles.image)}>
          <Skeleton width={110} height={150} />
        </div>

        <div className={clsx(styles.info)}>
          <div className="font-weight-5 mb-2">
            <Skeleton width={300} height={25} />
          </div>
          <div className="font-weight-3 mb-2">
            <Skeleton width={100} height={25} />
          </div>

          {/* SIZE */}
          <div className="flex-row flex-center mb-1">
            <Skeleton width={100} height={25} />
          </div>

          {/* QUANTITY */}
          <div className="flex-row flex-gap-1 flex-center-align-items">
            <Skeleton width={200} height={25} />
          </div>
        </div>

        <div className={clsx(styles.exit)}>
          <Skeleton circle width={30} height={25} />
        </div>
      </div>
    </SkeletonTheme>
  );
};

export default CartItemSkeleton;
