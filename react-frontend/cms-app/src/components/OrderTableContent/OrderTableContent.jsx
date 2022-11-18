import _ from "lodash";
import React, { useState } from "react";
import numberWithDot from "../../utils/numberWithDot";
import EmptyBodyTable from "../EmptyBodyTable";
import ModalCancelledOrder from "../ModalCancelledOrder";
import ModalOrderDetail from "../ModalOrderDetail/ModalOrderDetail";
import ModalShippingOrder from "../ModalShippingOrder";
import ModalVerifiedOrder from "../ModalVerifiedOrder";

const OrderTableContent = (props) => {
  const colorOrderStatus = [
    {
      key: 1,
      status: "Đã gửi hàng",
      style: "text-orange-500 font-bold",
    },
    {
      key: 2,
      status: "Đã xác nhận",
      style: "text-green-500",
    },
    {
      key: 3,
      status: "Chưa xác nhận",
      style: "text-back-500 font-bold",
    },
    {
      key: 4,
      status: "Đã hủy",
      style: "text-red-500",
    },
  ];

  const [orderIdChoose, setOrderIdChoose] = useState(null);
  const [showModalViewOrderDetail, setShowModalViewOrderDetail] =
    useState(false);
  const [showModalShippingOrder, setShowModalShippingOrder] = useState(false);
  const [showModalConfirmOrder, setShowModalConfirmOrder] = useState(false);
  const [showModalCancelOrder, setShowModalCancelOrder] = useState(false);

  return (
    <>
      {props.listOrder.length > 0 ? (
        props.listOrder.map((item, index) => (
          <tr key={index}>
            <td className="checkbox-cell">
              <label className="checkbox">
                <input type="checkbox"></input>
                <span className="check"></span>
              </label>
            </td>
            <td
              data-label="stt"
              className={`${item.cancelled && "line-through"} `}
            >
              {index}
            </td>
            <td
              data-label="name"
              className={`${item.cancelled && "line-through"} `}
            >
              {item.receiverName}
            </td>
            <td
              data-label="phone-number"
              className={`${item.cancelled && "line-through"} `}
            >
              {item.phoneNumber}
            </td>
            {/* <td data-label="Status">
          {item.enabled ? (
            <span className="icon text-green-600 text-2xl">
              <i className="mdi mdi-check-circle"></i>
            </span>
          ) : (
            <span className="icon text-red-600 text-2xl">
              <i className="mdi mdi-close-circle "></i>
            </span>
          )}
        </td> */}
            <td data-label="create-time">
              <small
                className={`${
                  item.cancelled && "line-through"
                } text-gray-500 text-sm`}
                title={item.createTime}
              >
                {item.orderTime}
              </small>
            </td>
            <td
              data-label="total-price"
              className={`${item.cancelled && "line-through"} `}
            >
              {numberWithDot(item.totalPrice)} đ
            </td>

            <td
              className={`${item.cancelled && "line-through"} text-center`}
              data-label="order-status"
            >
              <small
                className={`text-sm 
              ${
                colorOrderStatus.find((elem) =>
                  _.isEqual(item.orderStatus, elem.status)
                ).style
              }`}
                title={item.createTime}
              >
                {item.orderStatus}
              </small>
            </td>

            <td className="actions-cell">
              <div className="buttons justify-center nowrap">
                <button
                  className="!bg-blue-600 text-black hover:!bg-blue-600 font-bold px-[0.35rem] py-[0.31rem] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                  type="button"
                  onClick={() => {
                    setShowModalViewOrderDetail(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span class="icon" title="Xem đơn hàng">
                    <i class="mdi mdi-eye  text-white"></i>
                  </span>
                </button>

                <button
                  className={`${
                    (item.shipping || item.cancelled || !item.verified) &&
                    "disabled:opacity-25"
                  } !bg-orange-500 button small --jb-modal`}
                  type="button"
                  disabled={item.shipping || item.cancelled || !item.verified}
                  onClick={() => {
                    setShowModalShippingOrder(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span className="icon" title="Chuyển hàng">
                    <i className="mdi mdi-cart-check  text-white "></i>
                  </span>
                </button>

                <button
                  className={`button small green --jb-modal ${
                    (item.cancelled || item.verified || item.shipping) &&
                    "disabled:opacity-25"
                  } `}
                  type="button"
                  disabled={item.cancelled || item.verified || item.shipping}
                  onClick={() => {
                    setShowModalConfirmOrder(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span className="icon" title="Duyệt đơn hàng">
                    <i className="mdi mdi-text-box-check"></i>
                  </span>
                </button>

                <button
                  className={`${
                    (item.cancelled || item.verified || item.shipping) &&
                    "disabled:opacity-25"
                  } button small red --jb-modal`}
                  data-target="sample-modal"
                  type="button"
                  disabled={item.cancelled || item.verified || item.shipping}
                  onClick={() => {
                    setShowModalCancelOrder(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span className="icon" title="Hủy đơn hàng">
                    <i className="mdi mdi-text-box-remove"></i>
                  </span>
                </button>
                {orderIdChoose !== null && (
                  <>
                    {showModalViewOrderDetail && (
                      <ModalOrderDetail
                        orderId={orderIdChoose}
                        showModalViewOrderDetail={showModalViewOrderDetail}
                        setShowModalViewOrderDetail={
                          setShowModalViewOrderDetail
                        }
                      />
                    )}
                    {showModalShippingOrder && (
                      <ModalShippingOrder
                        orderId={orderIdChoose}
                        showModalShippingOrder={showModalShippingOrder}
                        setShowModalShippingOrder={setShowModalShippingOrder}
                      />
                    )}
                    {showModalConfirmOrder && (
                      <ModalVerifiedOrder
                        orderId={orderIdChoose}
                        showModalConfirmOrder={showModalConfirmOrder}
                        setShowModalConfirmOrder={setShowModalConfirmOrder}
                      />
                    )}
                    {showModalCancelOrder && (
                      <ModalCancelledOrder
                        orderId={orderIdChoose}
                        showModalCancelOrder={showModalCancelOrder}
                        setShowModalCancelOrder={setShowModalCancelOrder}
                      />
                    )}
                  </>
                )}
              </div>
            </td>
          </tr>
        ))
      ) : (
        <EmptyBodyTable colSpan={8} />
      )}
    </>
  );
};

export default OrderTableContent;
