import React from "react";
import numberWithDot from "../../utils/numberWithDot";

const ProductOrder = ({ data }) => {
  return (
    <div className="flex flex-row gap-4 justify-between justify-items-stretch my-4 p-2 border-2 border-[#999] rounded-md ">
      <div className="w-[150px] h-[180px] mx-4">
        <img className="w-[100%] h-[100%]" src={data.mainImage} alt="" />
      </div>

      <div className="w-[300px] p-4">
        <div className="font-medium text-lg text-orange-700 mb-2">
          {data.name} - {data.color}
        </div>
        <div className="font-weight-3 mb-2 font-medium">
          {numberWithDot(Number(data.price)) + " đ"}
        </div>

        {/* SIZE */}
        <div className="flex-row flex-center mb-1">
          <h4 className="font-weight-4 mr-1 font-bold">Size: {data.size}</h4>
        </div>

        {/* QUANTITY */}
        <div className="flex-row flex-gap-1 flex-center-align-items">
          <h4 className="font-weight-4 mr-1 font-bold">
            Số lượng: {data.quantity}
          </h4>
        </div>
      </div>

      <div className="my-auto font-bold">
        <h4 className="font-weight-4 mr-1">
          {numberWithDot(data.price * data.quantity)} đ
        </h4>
      </div>
    </div>
  );
};

export default ProductOrder;
