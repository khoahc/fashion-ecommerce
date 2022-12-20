import StarIcon from "@mui/icons-material/Star";
import { LoadingButton } from "@mui/lab";
import { Rating, TextareaAutosize, TextField } from "@mui/material";
import { green, orange } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";

import styles from "./Review.module.scss";
import * as reviewService from "../../services/review";
import { toast } from "react-toastify";
import clsx from "clsx";

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
