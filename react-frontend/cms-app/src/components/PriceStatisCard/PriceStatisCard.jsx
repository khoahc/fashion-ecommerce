import React from "react";

const PriceStatisCard = (props) => {
  return (
    <div className="px-20 py-5 border text-center ">
      <h3 className="font-medium mb-1 text-orange-500 text-base">
        {props.title}
      </h3>
      <span className="text-lg font-bold tracking-widest">{props.value}</span>
    </div>
  );
};

export default PriceStatisCard;
