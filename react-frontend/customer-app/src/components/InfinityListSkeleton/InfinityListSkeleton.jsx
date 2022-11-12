import React from "react";

import Grid from "../Grid";
import ProductCardSkeleton from "../ProductCardSkeleton";

const InfinityListSkeleton = () => {
  return (
    <div className="mb-3">
      <Grid col={4} mdCol={2} smCol={1} gap={10}>
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
        <ProductCardSkeleton />
      </Grid>
    </div>
  );
};

export default InfinityListSkeleton;
