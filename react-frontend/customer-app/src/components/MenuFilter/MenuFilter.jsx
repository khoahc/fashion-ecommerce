import React from "react";
import CheckBox from "../Checkbox/Checkbox";

const MenuFilter = (props) => {
  return (
    <>
      {props.menuData.map((item, index) => (
        <div key={index}>
          <CheckBox
            label={item.name}
            onChange={(input) => props.onChange("CATEGORY", input.checked, item)}
            checked={props.checkedList.includes(item.slug)}
          />

          {/* {item.hasOwnProperty("children") &&
            item.children.map((item, index) => (
              <CheckBox
                key={index}
                label={item.name}
                onChange={(input) =>
                  props.onChange("CATEGORY", input.checked, item)
                }
                checked={props.checkedList.includes(item.slug)}
              />
            ))} */}
        </div>
      ))}
    </>
  );
};

export default MenuFilter;
