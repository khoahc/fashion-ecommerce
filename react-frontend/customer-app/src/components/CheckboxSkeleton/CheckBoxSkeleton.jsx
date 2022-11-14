import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const CheckBoxSkeleton = () => {
  return (
    <SkeletonTheme baseColor="#ccc" highlightColor="#aaa">
      <div className="mb-1 flex-row flex-gap-1">
        <Skeleton circle height={30} width={30} />
        <Skeleton height={30} width={150}/>
      </div>
    </SkeletonTheme>
  );
};

export default CheckBoxSkeleton;
