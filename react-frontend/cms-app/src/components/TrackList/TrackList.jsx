import React from "react";
import { FaCheck } from "react-icons/fa";

import StepTrack from "../StepTrack";

const TrackList = (props) => {
  return (
    <div className="track">
      {props.data.map((item, index) => (
        <StepTrack
          key={index}
          icon={<FaCheck color="white" size={20} />}
          text={item.notes}
          date={item.updateTime}
          checked={true}
        />
      ))}
    </div>
  );
};

export default TrackList;
