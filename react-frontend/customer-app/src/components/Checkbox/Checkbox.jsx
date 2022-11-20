import { Checkbox, Box, FormControlLabel } from "@mui/material";
import { BsFillCheckCircleFill } from "react-icons/bs";

import { brown, orange } from "@mui/material/colors";
import PropTypes from "prop-types";
import React from "react";

const CheckBox = (props) => {
  const inputRef = React.useRef(null);

  const onChange = (e) => {
    props.onChange(inputRef.current.children[0]);
  };

  return (
    <FormControlLabel
      label={props.label}
      control={
        <Checkbox
          ref={inputRef}
          checked={props.checked}
          color={"success"}
          checkedIcon={<BsFillCheckCircleFill size={24} />}
          onChange={onChange}
          sx={
            props.hexCodeColor
              ? {
                  border: "1px solid #000",
                  color: "#" + props.hexCodeColor,
                  backgroundColor: "#" + props.hexCodeColor,
                  p: 0,
                  borderRadius: "19px",
                  margin: "3px 10px",
                  "&:hover": {
                    backgroundColor: "#" + props.hexCodeColor,
                  },
                  "&.Mui-checked": {
                    color: "#" + props.hexCodeColor,
                    backgroundColor: "#999",
                    borderRadius: "20px",
                  },
                }
              : {
                  border: "1px solid #000",
                  color: "#fff",                 
                  p: 0,                                
                  margin: "3px 10px",
                  "&.Mui-checked": {
                    color: orange[700],
                  },
                }
          }
        >
          <Box sx={{ border: "1px solid grey", p: 4 }}></Box>
        </Checkbox>
      }
    />
  );
};

CheckBox.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
};

export default CheckBox;
