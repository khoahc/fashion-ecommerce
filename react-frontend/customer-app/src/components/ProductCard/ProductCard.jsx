import React from "react";
import PropTypes from "prop-types";

import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import clsx from "clsx";

import { set } from "../../redux/product-modal/productModalSlice";

import Button from "../Button";
import styles from "./ProductCart.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";

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
        <h3>{numberWithCommas(props.price) + " đ"}</h3>
      </div>
    );
  }

  return (
    <div className={clsx(styles.container)}>
      <Link to={`/p/${props.slug}?color=${props.colors[0].slug}`}>
        <div className={clsx(styles.image)}>
          <img src={props.colors[0].mainImage} alt="image-product" />
        </div>
        <h4 className="mt-1" style={{ color: "#9e3500" }}>
          {props.name}
        </h4>
        <p className="mt-1">{props.colors.length + " màu"}</p>
        {price}
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
