import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { useParams, useNavigate, useSearchParams } from "react-router-dom";
import StarRatings from "react-star-ratings";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { IoIosAdd, IoIosRemove } from "react-icons/io";

import { addItem } from "../../redux/shopping-cart/cartItemsSlide";
import Breadcrumb from "../../components/Breadcrumb";
import Grid from "../../components/Grid";
import Button from "../../components/Button";
import styles from "./Product.module.scss";
import numberWithCommas from "../../utils/numberWithCommas";
import * as product from "../../services/product";

const Product = () => {
  const { slugProduct } = useParams();
  let navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchParams, setSearchParams] = useSearchParams();
  const [productDetail, setProductDetail] = useState([]);

  searchParams.get("size") != null &&
    searchParams.set("size", searchParams.get("size").toUpperCase());

  const [color, setColor] = useState(searchParams.get("color"));
  const [size, setSize] = useState(searchParams.get("size"));

  const [count, setCount] = useState(1);

  const notify = (type, message) => {
    type === 1
      ? toast.success(message, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        })
      : toast.warn(message, {
          position: "bottom-left",
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
  };

  const check = () => {
    if (
      color === null ||
      productDetail.colors.filter((item) => item.slug === color).length < 1
    ) {
      notify(0, "Vui lòng chọn màu sắc!");
      return false;
    }

    if (
      size === null ||
      productDetail.sizes.filter((item) => item.name === size).length < 1
    ) {
      notify(0, "Vui lòng chọn kích cỡ!");
      return false;
    }

    return true;
  };

  const addToCart = () => {
    if (check()) {
      let newItem = {
        name: productDetail.name,
        slugProduct: productDetail.slug,
        slugColor: color,
        size: size,
        count: count,
        enabled: false,
      };
      if (dispatch(addItem(newItem))) {
        notify(1, "Thêm vào giỏ hàng thành công!");
      } else {
        notify(0, "Thêm vào giỏ hàng thất bại");
      }
    }
  };

  const handleAddItemIntoCart = () => {
    addToCart();
  };

  useEffect(() => {
    // Promise.all([
    product
      .getProductDetailBySlug(
        slugProduct,
        searchParams.get("color"),
        searchParams.get("size")
      )
      .then((data) => {
        if (data.data.status === "OK") {
          setProductDetail(data.data.data);
        } else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        console.log(error);
        navigate("/error");
      });
  }, [searchParams]);

  return (
    <div className={clsx(styles.container)}>
      <Breadcrumb name={productDetail.name} />

      <div className={clsx(styles.wrap)}>
        <div className={clsx(styles.left)}>
          <div>
            {/* main image */}
            <img src={productDetail.mainImage} alt="" />
          </div>
          <div className="">
            {/* image list */}
            <Grid col={2} gap={10}>
              {productDetail.imageList &&
                productDetail.imageList.map((item, index) => (
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
              {productDetail.colors?.map((item, index) => (
                <Button
                  onClick={() => {
                    setSearchParams({
                      ...Object.fromEntries([...searchParams]),
                      color: item.slug,
                    });
                    setColor(item.slug);
                  }}
                  active={
                    item.slug === searchParams.get("color") ? true : false
                  }
                  backgroundColor="white"
                  color="black"
                  border="border"
                  radius="0-5"
                  size="8"
                  paddingX="0-1"
                  paddingY="0-1"
                  key={index}
                >
                  <img
                    className="border-radius-0-5"
                    key={index}
                    src={item.image}
                  />
                </Button>
              ))}
            </div>
          </div>
          <hr />

          {/* size */}
          <div className="mb-2">
            <h3>Size</h3>
            <div className={clsx(styles.list)}>
              {productDetail.sizes?.map((item, index) => (
                <Button
                  key={index}
                  onClick={() => {
                    setSearchParams({
                      ...Object.fromEntries([...searchParams]),
                      size: item.name,
                    });
                    setSize(item.name);
                  }}
                  active={item.name === searchParams.get("size") ? true : false}
                  backgroundColor="white"
                  color="black"
                  border="border"
                  radius="1"
                  fontWeight="3"
                  size="5"
                  paddingX="2"
                  paddingY="1"
                >
                  {item.name}
                </Button>
              ))}
            </div>
          </div>
          <hr />
          {/* order */}
          <div className="flex-column flex-gap-1 mb-2">
            <div>
              <h3>Chọn số lượng</h3>
              <div className="mt-1">
                <Button
                  onClick={() => {
                    count > 1 && setCount((count) => count - 1);
                  }}
                  disabled={productDetail.quantity > 0 ? false : true}
                  backgroundColor="white"
                  border="border"
                  radius="5"
                  fontWeight="3"
                  size="5"
                  paddingX="2"
                  paddingY="1"
                >
                  <IoIosRemove />
                </Button>
                <span className="mX-1">{count}</span>
                <Button
                  onClick={() =>
                    count < productDetail.quantity &&
                    setCount((count) => count + 1)
                  }
                  disabled={productDetail.quantity > 0 ? false : true}
                  backgroundColor="white"
                  border="border"
                  radius="5"
                  fontWeight="3"
                  size="5"
                  paddingX="2"
                  paddingY="1"
                >
                  <IoIosAdd />
                </Button>

                {/* isStock */}
                {productDetail.quantity > 0 ? (
                  <span className={clsx(styles.countInStock)}>
                    Còn {productDetail.quantity} sản phẩm
                  </span>
                ) : productDetail.quantity === 0 ? (
                  <span className={clsx(styles.countInStock)}>Hết hàng</span>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Button
              onClick={handleAddItemIntoCart}
              backgroundColor="white"
              color="black"
              border="border"
              radius="3"
              fontWeight="3"
              size="5"
            >
              Thêm vào giỏ
            </Button>

            <Button
              onClick={""}
              backgroundColor="black"
              color="white"
              radius="3"
              fontWeight="3"
              size="5"
            >
              Mua ngay
            </Button>

            <ToastContainer
              position="bottom-right"
              autoClose={2000}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick
              rtl={false}
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="light"
            />
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
          <div className="flex-row flex-center mb-2">
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
  );
};

export default Product;
