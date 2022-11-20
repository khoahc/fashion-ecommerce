import React from "react";
import CartItemSkeleton from "../CartItemSkeleton"

const InfinityCartListSkeleton = () => {
  return (
    <div className="mb-3 flex-column">
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
      <CartItemSkeleton />
    </div>
  );
};

export default InfinityCartListSkeleton;
