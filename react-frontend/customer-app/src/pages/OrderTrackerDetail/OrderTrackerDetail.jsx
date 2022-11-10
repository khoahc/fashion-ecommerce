import clsx from "clsx";
import React from "react";
import ProductCheckout from "../../components/ProductCheckout";
import TrackList from "../../components/TrackList";
import numberWithCommas from "../../utils/numberWithCommas";

import styles from "./OrderTrackerDetail.module.scss";

const OrderTrackerDetail = (props) => {
  return (
    <div className={clsx(styles.container)}>
      <div className={clsx(styles.left)}>
        <div className={clsx(styles.title)}>
          <h3 className="font-weight-6 font-spacing-1 uppercase">
            Tình trạng đơn hàng
          </h3>
        </div>

        <div className="mY-2">
          <h4 className="font-weight-5 font-spacing-1 uppercase ">
            Mã đơn hàng: {props.data.orderId}{" "}
          </h4>
        </div>

        <TrackList data={props.data.orderTracks} />
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
            <span className="uppercase">Ngày đặt</span>{" "}
            <span>{props.data.orderTime}</span>
          </div>
          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">
              {Number(props.data.products.length)} sản phẩm
            </span>{" "}
            <span>{numberWithCommas(Number(props.data.totalPrice))} đ</span>
          </div>
          <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">Phí ship</span>{" "}
            <span>{numberWithCommas(Number(props.data.shipCost))} đ</span>
          </div>

          {/* <div className="mY-1 flex-row flex-center font-weight-4">
            <span className="uppercase">Số ngày vận chuyển dự kiến</span>{" "}
            <span>{numberWithCommas(Number(1))} ngày</span>
          </div> */}

          <div className="mY-1 flex-row flex-center font-weight-bold">
            <span className="uppercase">Tổng</span>{" "}
            <span>
              {numberWithCommas(
                Number(props.data.totalPrice + props.data.shipCost)
              )}{" "}
              đ
            </span>
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
            {props.data.products.map((item, index) => (
              <ProductCheckout key={index} data={item} count={item.quantity} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderTrackerDetail;
