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

  return (
    <div className={clsx(styles.container)}>
      <Link to={`/p/${props.slug}`}>
        <div className={clsx(styles.image)}>
          <img src={props.img01} alt="image-product" />
        </div>
        <h3 className="mt-1" style={{ color: "#9e3500" }}>
          {props.name}
        </h3>
        <p className="mt-1">{props.countColor + " màu"}</p>
        <div className={clsx([styles.price, "mt-1"])}>
          <h3>{numberWithCommas(props.price) + " đ"}</h3>
          <span className={clsx(styles.promotional)}>
            {numberWithCommas(399000) + " đ"}
          </span>
        </div>
      </Link>
      <div className="product-card__btn">
        <Button
          size="sm"
          icon="bx bx-cart"
          animate={true}
          onClick={() => dispatch(set(props.slug))}
        >
          chọn mua
        </Button>
      </div>
    </div>
  );
};

ProductCard.propTypes = {
  img01: PropTypes.string.isRequired,
  img02: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  slug: PropTypes.string.isRequired,
};

export default ProductCard;
