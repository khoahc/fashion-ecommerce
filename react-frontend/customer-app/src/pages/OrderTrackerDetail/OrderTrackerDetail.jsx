import clsx from "clsx";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import TrackList from "../../components/TrackList";
import numberWithCommas from "../../utils/numberWithCommas";

import styles from "./OrderTrackerDetail.module.scss";

const OrderTrackerDetail = () => {
  const [loading, setLoading] = useState(false);

  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.left)}>
        <div className={clsx(styles.title)}>
          <h3 className="font-weight-6 font-spacing-1 uppercase">
            Tình trạng đơn hàng
          </h3>
        </div>

        <div style={{ textDecoration: "underline" }}>
          <Link to={"/order-tracker"}>Đơn hàng khác?</Link>
        </div>

        <div className="font-weight-5 font-spacing-1 uppercase mY-2">
          <h3>Mã đơn hàng: 12131 </h3>
        </div>

        <TrackList data={[]} />
      </div>

      {/* RIGHT cointainer */}
      <div className={clsx(styles.right)}>
        <div className={clsx(styles.title)}>
          <h3 className="font-weight-6 font-spacing-1 uppercase">
            Thông tin đơn hàng
          </h3>
        </div>

        <div className="mY-1 mX-2">
          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">Ngày đặt</span> <span>2/3/2022</span>
          </div>
          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">{Number(1)} sản phẩm</span>{" "}
            <span>{numberWithCommas(Number(12))} đ</span>
          </div>
          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">Phí ship</span>{" "}
            <span>{numberWithCommas(Number(12))} đ</span>
          </div>

          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">Số ngày vận chuyển dự kiến</span>{" "}
            <span>{numberWithCommas(Number(1))} ngày</span>
          </div>

          <div className="mY-1 flex-row flex-center font-weight-bold">
            <span className="uppercase">Tổng</span>{" "}
            <span>{numberWithCommas(Number(1 + 12))} đ</span>
          </div>
        </div>

        <div className="flex-column flex-gap-1 py-2">
          {/* product list */}
          <div className="mY-2">
            <div className={clsx(styles.title)}>
              <h3 className="font-weight-5 font-spacing-1 uppercase">
                Sản phẩm đặt mua
              </h3>
            </div>

            {/* {productsCheckout.map((item, index) => (
              <ProductCheckout
                key={index}
                data={item}
                onChange={setProductsCheckout}
              />
            ))} */}

            {/* <ProductCheckout /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackerDetail;
