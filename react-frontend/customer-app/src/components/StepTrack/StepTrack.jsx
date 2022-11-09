import clsx from "clsx";
import React from "react";

import styles from "./StepTrack.module.scss";

const StepTrack = (props) => {
  return (
    <div className={clsx(styles.step)}>
      <span className={clsx(styles.text)}>{props.text}</span>
      <span
        className={
          props.checked ? clsx([styles.icon, styles.active]) : clsx(styles.icon)
        }
      >
        {props.icon}
      </span>
      <i className={clsx(styles.date)}>{props?.date ? props.date : ""}</i>
    </div>
  );
};

export default StepTrack;
