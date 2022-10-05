import React from "react";
import clsx from "clsx";

import Breadcrumb from "../../components/Breadcrumb";
import Grid from "../../components/Grid";
import productDetail from "../../assets/fake-data/productDetail";
import styles from "./Product.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";

const Product = () => {
  return (
    <div className={clsx(styles.container)}>
      <Breadcrumb name={productDetail.name} />

      <div className={clsx(styles.wrap)}>
        <div className={clsx(styles.left)}>
          <div className="">
            {/* main image */}
            <img
              src={productDetail.mainImage}
              alt={productDetail.name + " image"}
            />
          </div>
          <div className="">
            {/* image list */}
            <Grid col={2} gap={10}>
              {productDetail.imageList.map((item, index) => (
                <div key={index}>
                  <img src={item.path} alt="product-image" />
                </div>
              ))}
            </Grid>
          </div>
        </div>

        <div className={clsx(styles.right)}>
          <div className={clsx(styles.title)}>
            <div>
              <h2>{productDetail.name}</h2>
            </div>
            <div>
              <span>{numberWithCommas(productDetail.price)}</span>
            </div>
          </div>

          <div className={clsx(styles.color)}>
            <h4>Màu</h4>
            <div className={clsx(styles.colorList)}>
              {productDetail.color.map((item, index) => (
                <p key={index}>{item.name}</p>
              ))}
            </div>
          </div>

          <div className={clsx(styles.size)}>
            <h4>Size</h4>
            <div className={clsx(styles.sizeList)}>
              {productDetail.size.map((item, index) => (
                <p key={index}>{item.name}</p>
              ))}
            </div>
          </div>

          <div className="">
            <div>
              {/* <div class="quantity buttons_added form-flat">
                <input type="button" value="-" class="minus button is-form" />{" "}
                <label class="screen-reader-text" for="quantity_633da3ac2a4d0">
                  Sơ Mi CLassic - Lụa Ngoc Trai - AN 052 126 số lượng
                </label>
                <input
                  type="number"
                  id="quantity_633da3ac2a4d0"
                  class="input-text qty text"
                  step="1"
                  min="1"
                  max="28"
                  name="quantity"
                  value="1"
                  title="SL"
                  size="4"
                  placeholder=""
                  inputmode="numeric"
                />
                <input type="button" value="+" class="plus button is-form" />{" "}
              </div> */}
            </div>
            <div>Thêm vào giỏ hàng</div>
          </div>

          <div className="">
            {/* Product detail */}
            <div></div>
            <div></div>
          </div>

          <div className="">
            {/* Review */}
            <div></div>
            <div></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
