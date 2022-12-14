import PropTypes from "prop-types";
import React from "react";

import clsx from "clsx";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";


import numberWithCommas from "../../utils/numberWithCommas";
import styles from "./ProductCart.module.scss";

const ProductCard = (props) => {
  const dispatch = useDispatch();

  let price;
  if (props.promotionalPrice !== null) {
    price = (
      <>
        <div className={clsx([styles.price, "mt-1"])}>
          <h3>{numberWithCommas(Number(props.promotionalPrice)) + " đ"}</h3>
          <span className={clsx(styles.promotional)}>
            {numberWithCommas(props.price) + " đ"}
          </span>
        </div>
        <span className={clsx(styles.discount)}>{props.discountValue}</span>
      </>
    );
  } else {
    price = (
      <div className={clsx([styles.price, "mt-1"])}>
        <h4>{numberWithCommas(props.price) + " đ"}</h4>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container)}>
      <Link
        to={
          props.colors.length > 0
            ? `/p/${props.slug}?color=${props.colors[0].slug}`
            : `/p/${props.slug}`
        }
      >
        <div className={clsx(styles.image)}>
          <img
            src={props.colors.length > 0 ? props.colors[0].mainImage : ""}
            alt="image-product"
          />
        </div>
        <div className={clsx(styles.info)}>
          <h4 className="mt-1 orange-bold font-weight-5">
            {props.name}
          </h4>
          <p className="mt-1">{props.colors.length + " màu"}</p>
          {price}
        </div>
      </Link>
      {/* <div className="product-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => dispatch(set(props.slug))}
        >
          chọn mua
        </Button>
      </div> */}
    </div>
  );
};

ProductCard.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
