import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import React from "react";

import clsx from "clsx";
import styles from "./Review.module.scss";

const Review = (props) => {
  return (
    <div className={styles.container}>
      <h3 className="mb-1">{props.data.headline}</h3>
      <Rating
        name="hover-feedback"
        value={props.data.rating}
        readOnly={true}
        size="small"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <p className="mb-1 mt-1">{props.data.comment}</p>
      <div className="flex-row flex-gap-1 flex-center">
        <h5>Người mua: {props.data.fullName}</h5>
        <span className={clsx(styles.reviewTime)}>{props.data.reviewTime}</span>
      </div>
    </div>
  );
};

export default Review;
