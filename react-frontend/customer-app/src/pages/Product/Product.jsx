import React, { Text, useState, useEffect } from "react";
import clsx from "clsx";
import { useParams, useNavigate } from "react-router-dom";
import StarRatings from "react-star-ratings";

import Breadcrumb from "../../components/Breadcrumb";
import Grid from "../../components/Grid";
import Button from "../../components/Button";
import productDetail1 from "../../assets/fake-data/productDetail";
import styles from "./Product.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";
import * as product from "../../services/product";

const Product = () => {
  const { slugProduct } = useParams();
  let navigate = useNavigate();

  const [productDetail, setProductDetail] = useState([]);

  useEffect(() => {
    // Promise.all([
    product
      .getProductDetailBySlug(slugProduct)
      .then((data) => {
        if (data.data.status === "OK") {
          setProductDetail(data.data.data);
          console.log(data.data.data)
        } else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  }, []);

  return (
    <div className={clsx(styles.container)}>
      <Breadcrumb name={productDetail.name} />

      <div className={clsx(styles.wrap)}>
        <div className={clsx(styles.left)}>
          <div className="image">
            {/* main image */}
            <img
              src={productDetail.mainImage}
              alt={productDetail.name + " image"}
            />
          </div>
          <div className="">
            {/* image list */}
            <Grid col={2} gap={10}>
              {productDetail.imageList && productDetail.imageList.map((item, index) => (
                <div key={index}>
                  <img src={item.path} alt="product-image" />
                </div>
              ))}
            </Grid>
          </div>
        </div>

        <div className={clsx(styles.right)}>
          <div className="mb-2">
            <div>
              <h2 className="mb-2">{productDetail.name}</h2>
            </div>
            <div>
              <span>
                {numberWithCommas(Number(productDetail.price)) + " đ"}
              </span>
            </div>
          </div>

          {/* color */}
          <div className="mb-2">
            <h3>Màu</h3>
            <div className={clsx(styles.list)}>
              {/* {productDetail.color.map((item, index) => (
                <p key={index}>{item.name}</p>
              ))} */}
            </div>
          </div>
          <hr />
          {/* size */}
          <div className="mb-2">
            <h3>Size</h3>
            <div className={clsx(styles.list)}>
              {/* {productDetail.size.map((item, index) => (
                <span key={index}>{item.name}</span>
              ))} */}
            </div>
          </div>
          <hr />
          {/* order */}
          <div className="flex-column flex-gap-1 mb-2">
            <div>
              <h3>Chọn số lượng</h3>
              <div className="mt-1">
                {/* <input type="button" value="-" class="minus button is-form" />{" "}
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
                <input type="button" value="+" class="plus button is-form" />{" "} */}
                <button>-</button>
                <span>1</span>
                <button>+</button>
                <span className={clsx(styles.countInStock)}>
                  Còn 10 sản phẩm
                </span>
              </div>
            </div>
            <Button
              className={clsx(styles.btnAddCard)}
              onClick={""}
              backgroundColor="black"
              color="white"
              radius="3"
              fontWeight="3"
              size="5"
            >
              Thêm vào giỏ
            </Button>
            <Button
              onClick={""}
              backgroundColor="white"
              color="black"
              border="border"
              radius="3"
              fontWeight="3"
              size="5"
            >
              Mua ngay
            </Button>
          </div>
          <hr />
          <div className="mb-2">
            {/* Product detail */}
            <h3 className="mb-1">Chi tiết sản phẩm</h3>
            <div className={clsx(styles.description)}>
              <p>{productDetail.description}</p>
            </div>
          </div>
          <hr />
          <div className="flex-row flex-center">
            {/* Review */}
            <div>
              <h3 className="mb-1">Đánh giá sản phẩm</h3>
              <div>
                <StarRatings
                  rating={productDetail.rate}
                  starSpacing="1px"
                  starDimension="20px"
                  starRatedColor="#F2C94C"
                />
              </div>
            </div>
            <div className="flex-column flex-right flex-gap-1">
              <div>
                <Button>Viết đánh giá</Button>
              </div>
              <div>
                <Button className="">Xem tất cả</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    // <></>
  );
};

export default Product;
