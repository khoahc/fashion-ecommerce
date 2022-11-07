import React from "react";
import { FaBox, FaCheck, FaClock, FaTruckMoving } from "react-icons/fa";

import StepTrack from "../StepTrack"

const TrackList = (props) => {
  const TrackOption = [
    {key: "NEW", value: "Khách xác nhận đơn hàng"},
    {key: "PROCESSING", value: "Xử lý đơn hàng"},
    {key: "PACKAGED", value: "Gói hàng"},
    {key: "SHIPPING", value: "Vận chuyển"},
    {key: "DELIVERED", value: "Đã nhận hàng"},
  ]

  return (
    <div className="track">
      <StepTrack
        icon={<FaCheck color="white" size={20} />}
        text={"Khách xác nhận đơn hàng"}
        date={"10/11/2022"}
        checked={true}
      />
      <StepTrack
        icon={<FaClock color="white" size={20} />}
        text={"Xử lý đơn hàng"}
        date={"10/11/2022"}
        checked={true}
      />
      <StepTrack
        icon={<FaBox color="white" size={20} />}
        text={"Gói hàng"}
        date={"10/11/2022"}
        checked={true}
      />
      <StepTrack
        icon={<FaTruckMoving color="white" size={20} />}
        text={"Vận chuyển"}
        checked={false}
      />
      <StepTrack
        icon={<FaCheck color="white" size={20} />}
        text={"Đã nhận hàng"}
        checked={false}
      />
    </div>
  );
};

export default TrackList;
