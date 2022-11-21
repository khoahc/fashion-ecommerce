import React from "react";
import { FaCheck } from "react-icons/fa";

import StepTrack from "../StepTrack";

const TrackList = (props) => {
  // const TrackOption = [
  //   // { key: "NEW", value: "Khách đã xác nhận đơn hàng" },
  //   // { key: "PROCESSING", value: "Xử lý đơn hàng" },
  //   // { key: "PACKAGED", value: "Gói hàng" },
  //   // { key: "SHIPPING", value: "Vận chuyển" },
  //   // { key: "DELIVERED", value: "Đã nhận hàng" },

  //   { key: "NEW", value: "Chưa xác nhận" },
  //   { key: "VERIFIED", value: "Đã xác nhận" },
  //   { key: "SHIPPING", value: "Đã gửi hàng" },
  //   { key: "CANCELLED", value: "Đã hủy" },
  // ];

  // const findUpdateTime = (listTrack, indexTrackOption) => {
  //   let object = listTrack.find(
  //     (item) =>
  //       item.status.localeCompare(TrackOption.at(indexTrackOption).key) === 0
  //   );
  //   return object ? object.updateTime : null;
  // };

  return (
    <div className="track">
      {/* <StepTrack
        icon={<FaCheck color="white" size={20} />}
        text={"Khách xác nhận đơn hàng"}
        date={findUpdateTime(props.data, 0)}
        checked={findUpdateTime(props.data, 0) ? true : false}
      />
      <StepTrack
        icon={<FaClock color="white" size={20} />}
        text={"Xử lý đơn hàng"}
        date={findUpdateTime(props.data, 1)}
        checked={findUpdateTime(props.data, 1) ? true : false}
      />
      <StepTrack
        icon={<FaBox color="white" size={20} />}
        text={"Gói hàng"}
        date={findUpdateTime(props.data, 2)}
        checked={findUpdateTime(props.data, 2) ? true : false}
      />
      <StepTrack
        icon={<FaTruckMoving color="white" size={20} />}
        text={"Vận chuyển"}
        date={findUpdateTime(props.data, 3)}
        checked={findUpdateTime(props.data, 3) ? true : false}
      />
      <StepTrack
        icon={<FaCheck color="white" size={20} />}
        text={"Đã nhận hàng"}
        date={findUpdateTime(props.data, 4) ? true : false}
        checked={false}
      /> */}

      {props.data.map((item, index) => 
        <StepTrack
          key={index}
          icon={<FaCheck color="white" size={20} />}
          text={item.notes}
          date={item.updateTime}
          checked={true}
        />
      )}
    </div>
  );
};

export default TrackList;
