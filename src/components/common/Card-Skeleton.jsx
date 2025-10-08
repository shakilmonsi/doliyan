import React from "react";
import Skeleton from "react-loading-skeleton";

const CardSkeleton = () => {
  return (
    <div className="mb-6 flex overflow-hidden rounded-lg bg-white shadow">
      <div className="h-[270px] w-2/3 p-4">
        <Skeleton height="100%" />
      </div>
      <div className="flex w-2/2 flex-col justify-between p-4">
        <div className="flex flex-grow flex-col gap-1">
          <Skeleton height={24} width="70%" />

          <Skeleton count={4} height={14} />
          <Skeleton height={16} width="40%" />
          <div className="mt-4 flex gap-4">
            <Skeleton width={100} height={30} />
            <Skeleton width={100} height={30} />
          </div>
        </div>
        <div className="mt-4">
          <Skeleton height={24} width="100%" className="mt-1" />
        </div>
      </div>
    </div>
  );
};

export default CardSkeleton;
