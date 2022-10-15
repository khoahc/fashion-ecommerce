import React from "react";
import CheckBox from "../Checkbox/Checkbox";

const ColorFilter = (props) => {
  return (
    <>
      {props.colorsData.map((item, index) => (
        <div key={index} className="">
          <CheckBox
            label={item.name}
            onChange={(input) => props.onChange("COLOR", input.checked, item)}
            checked={props.checkedList.includes(item.slug)}
          />
        </div>
      ))}
    </>
  );
};

export default ColorFilter;
