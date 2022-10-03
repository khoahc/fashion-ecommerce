import React from "react";
import PropTypes from "prop-types";

const CheckBox = (props) => {
  const inputRef = React.useRef(null);

  const onChange = (e) => {
    if (inputRef.current.checked !== 'on' && props.onChange) {
      props.onChange(inputRef.current);
    } 
    
  };

  return (
    <div>
      <label>
        <input className="mr-1"
          type="checkbox"
          ref={inputRef}
          onChange={onChange}
          checked={props.checked}
        />       
        {props.label}
      </label>
    </div>
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default CheckBox;
