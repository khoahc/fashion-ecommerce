import PropTypes from "prop-types";
import React from "react";

const Button = (props) => {
  const bg = props.backgroundColor
    ? "btn-bg-" + props.backgroundColor
    : "bg-main";

  const size = props.size ? "btn-size-" + props.size : "";

  const animate = props.animate ? "btn-animate" : "";

  const border = props.border ? "btn-border" : "";

  const radius = props.radius ? "border-radius-" + props.radius : "";

  const color = props.color ? "color-" + props.color : "";

  const fontWeight = props.fontWeight ? "font-weight-" + props.fontWeight : "";

  const paddingX = props.paddingX ? "px-" + props.paddingX : "";

  const paddingY = props.paddingY ? "py-" + props.paddingY : "";

  const custom = props.custom ? props.custom : "";

  const active = props.active === true ? "active" : null;

  const width = props.width ? "w-" + props.width : null
  return (
    <button
      className={`btn ${paddingX} ${paddingY} ${bg} ${color} ${width}
            ${fontWeight} ${size} ${animate} ${border} ${radius} ${custom} ${active}`}
      onClick={
        props.onClick
          ? () => {
              props.onClick();
            }
          : null
      }
      type={props.type ? props.type : "button"}
      disabled={props.disabled}
    >
      <span className="">{props.children}</span>
      {props.icon ? (
        <span className="">
          <i className={`${props.icon}`}></i>
        </span>
      ) : null}
    </button>
  );
};

Button.propTypes = {
  backgroundColor: PropTypes.string,
  size: PropTypes.string,
  icon: PropTypes.string,
  animate: PropTypes.bool,
  onclick: PropTypes.func,
};

export default Button;
