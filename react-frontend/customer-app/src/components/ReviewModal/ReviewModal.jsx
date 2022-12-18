import StarIcon from "@mui/icons-material/Star";
import { Rating, TextareaAutosize, TextField } from "@mui/material";
import { orange } from "@mui/material/colors";
import { Box } from "@mui/system";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "./ReviewModal.module.scss";

const ReviewModal = ({ setOpenReviewModal, productSlug }) => {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const labels = {
    1: "Rất tệ",
    2: "Tệ",
    3: "Bình thường",
    4: "Tốt",
    5: "Rất tốt",
  };

  const getLabelText = (value) => {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labels[value]}`;
  };

  const [rating, setRating] = useState(5);
  const [hover, setHover] = useState(-1);

  const inputRating = useRef();

  useEffect(() => {
    inputRating.current = rating;
    setValue("rating", rating);
  }, [rating]);

  const onSubmit = (data) => {
    console.log("data", data);
    // setLoading(true);
    // const dataPost = {
    //   ...data,
    //   products: productsCheckout,
    //   shipCost: shipCost,
    //   totalPrice: totalPrice,
    // };
    // console.log(JSON.stringify(dataPost, null, 2) + " dataPost");

    // //post order
    // order
    //   .postOrder(dataPost)
    //   .then((response) => {
    //     notify(1, "Đặt hàng thành công");
    //     navigate("/order/verify");
    //     console.log(response);
    //   })
    //   .catch(function (error) {
    //     notify(0, "Đặt hàng thất bại!");
    //     // setModalIsOpen(true);
    //     console.log(error);
    //   });
  };

  return (
    <div className={styles.modalBackground}>
      <div className={styles.modalContainer}>
        <div className={styles.titleCloseBtn}>
          <button
            onClick={() => {
              setOpenReviewModal(false);
            }}
          >
            X
          </button>
        </div>
        <div className={styles.title}>
          <h2>Đánh giá sản phẩm</h2>
        </div>

        <form className={styles.content}>
          <input
            type="text"
            value={productSlug}
            {...register("productSlug")}
            hidden={true}
            readOnly={true}
          />

          <Rating
            name="hover-feedback"
            value={rating}
            precision={1}
            getLabelText={getLabelText}
            onChange={(event, newRating) => {
              inputRating.current = newRating;
              setRating(newRating);
              // console.log('rating', rating)
              // console.log("inputRating.current.value", inputRating.current);
            }}
            onChangeActive={(event, newHover) => {
              setHover(newHover);
            }}
            emptyIcon={
              <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
            }
          />

          <input
            type="number"
            value={rating}
            ref={inputRating}
            {...register("rating")}
            hidden={true}
            readOnly={true}
          />

          {rating !== null && (
            <Box sx={{ ml: 2, color: orange[600] }}>
              {labels[hover !== -1 ? hover : rating]}
            </Box>
          )}

          <TextField
            required
            id="outlined-password-input"
            label="Tiêu đề"
            type="text"
            fullWidth
            size="small"
            {...register("headline", {
              required: "Tiêu đề không được trống!",
              pattern: {
                value:
                  /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/,
                message: "Tiêu đề không hợp lệ!",
              },
            })}
            error={!!errors?.headline}
            helperText={errors?.headline ? errors.headline.message : null}
          />

          <TextareaAutosize
            minRows={5}
            maxRows={10}
            aria-label="comment"
            placeholder="Mời bạn chia sẻ thêm một số cảm nhận về sản phẩm ..."
            style={{ width: 450, fontSize: "1rem", padding: "10px" }}
            {...register("comment", {
              required: "Bình luận không được trống!",
              pattern: {
                value:
                  /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/,
                message: "Bình luận không hợp lệ!",
              },
            })}
            error={!!errors?.comment}
            helperText={errors?.comment ? errors.comment.message : null}
          />

          <div className="flex-row flex-row-right flex-gap-1">
            <TextField
              required
              id="outlined-password-input"
              label="Họ và tên"
              type="text"
              fullWidth
              size="small"
              {...register("fullName", {
                required: "Họ và tên không được trống!",
                pattern: {
                  value:
                    /[aAàÀảẢãÃáÁạẠăĂằẰẳẲẵẴắẮặẶâÂầẦẩẨẫẪấẤậẬbBcCdDđĐeEèÈẻẺẽẼéÉẹẸêÊềỀểỂễỄếẾệỆfFgGhHiIìÌỉỈĩĨíÍịỊjJkKlLmMnNoOòÒỏỎõÕóÓọỌôÔồỒổỔỗỖốỐộỘơƠờỜởỞỡỠớỚợỢpPqQrRsStTuUùÙủỦũŨúÚụỤưƯừỪửỬữỮứỨựỰvVwWxXyYỳỲỷỶỹỸýÝỵỴzZ]/,
                  message: "Họ và tên không hợp lệ!",
                },
              })}
              error={!!errors?.fullName}
              helperText={errors?.fullName ? errors.fullName.message : null}
            />

            <TextField
              required
              id="outlined-password-input"
              label="Email"
              type="email"
              size="small"
              fullWidth
              {...register("email", {
                required: "Email không được trống!",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Địa chỉ email không hợp lệ!",
                },
              })}
              error={!!errors?.email}
              helperText={errors?.email ? errors.email.message : null}
            />
          </div>
        </form>

        <div className={styles.footer}>
          <div className="m-auto">
            <button
              className="px-2 py-1 btn-bg-black border-radius-1"
              onClick={() => {
                setOpenReviewModal(false);
              }}
              id="cancelBtn"
            >
              Thoát
            </button>
          </div>
          <form className="m-auto" onSubmit={handleSubmit(onSubmit)}>
            <button className="px-2 py-1 btn-bg-green border-radius-1">
              Gửi
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewModal;
