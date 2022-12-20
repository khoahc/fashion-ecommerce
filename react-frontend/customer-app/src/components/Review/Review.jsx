import StarIcon from "@mui/icons-material/Star";
import { Rating } from "@mui/material";
import clsx from "clsx";
import React from "react";
import { BsFillPatchCheckFill } from "react-icons/bs";
import styles from "./Review.module.scss";

const Review = (props) => {
  return (
    <div className={styles.container}>
      <h4 className="mb-1">{props.data.headline}</h4>
      <Rating
        name="hover-feedback"
        value={props.data.rating}
        readOnly={true}
        size="small"
        emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
      />
      <p className="mb-1 mt-1">{props.data.comment}</p>
      <div className="flex-row flex-center">
        <div className="flex-row flex-gap-1">
          <h5>Người mua: {props.data.fullName}</h5>
          {props.data.bought && (
            <span className={clsx(styles.bought)}>
              <BsFillPatchCheckFill color="green" /> Đã mua hàng
            </span>
          )}
        </div>
        <span className={clsx(styles.reviewTime)}>{props.data.reviewTime}</span>
      </div>
    </div>
  );
};

export default Review;
