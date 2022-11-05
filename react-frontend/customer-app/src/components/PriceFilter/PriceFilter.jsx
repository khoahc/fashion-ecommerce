import _ from "lodash";
import React from "react";

import numberWithCommas from "../../utils/numberWithCommas";
import CheckBox from "../Checkbox/Checkbox";

const PriceFilter = (props) => {
  const MAX_PRICE = 99999999999;
  const filterPrice = [
    { start: 0, end: 50000 },
    { start: 50000, end: 100000 },
    { start: 100000, end: 150000 },
    { start: 150000, end: 200000 },
    { start: 200000, end: 300000 },
    { start: 300000, end: 500000 },
    { start: 500000, end: MAX_PRICE },
  ];

  return (
    <>
      {filterPrice.map((item, index) => (
        <div key={index} className="">
          <CheckBox
            label={
              item.end < MAX_PRICE
                ? numberWithCommas(item.start) +
                  " đ" +
                  " - " +
                  numberWithCommas(item.end) +
                  " đ"
                : "Hơn " + numberWithCommas(item.start) + " đ"
            }
            onChange={(input) => props.onChange("PRICE", input.checked, item)}
            checked={props.checkedList.some((elem) => _.isEqual(item, elem))}
          />
        </div>
      ))}
    </>
  );
};

export default PriceFilter;
