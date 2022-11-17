import React, { useState } from "react";
import numberWithDot from "../../utils/numberWithDot";
import EmptyBodyTable from "../EmptyBodyTable";
import ModalOrderDetail from "../ModalOrderDetail/ModalOrderDetail";
import ModalShippingOrder from "../ModalShippingOrder";

const OrderTableContent = (props) => {
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
            <td data-label="stt">{index}</td>
            <td data-label="name">{item.receiverName}</td>
            <td data-label="phone-number">{item.phoneNumber}</td>
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
              <small className="text-gray-500 text-sm" title={item.createTime}>
                {item.orderTime}
              </small>
            </td>

            <td data-label="total-price">{numberWithDot(item.totalPrice)} đ</td>

            <td className="actions-cell">
              <div className="buttons justify-center nowrap">                
                <button
                  className="!bg-blue-400 text-black hover:!bg-blue-600 font-bold px-[0.35rem] py-[0.31rem] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
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
                
                {orderIdChoose !== null && (
                  <>
                    <ModalOrderDetail
                      orderId={orderIdChoose}
                      showModalViewOrderDetail={showModalViewOrderDetail}
                      setShowModalViewOrderDetail={setShowModalViewOrderDetail}
                    />
                    <ModalShippingOrder
                      orderId={orderIdChoose}
                      showModalShippingOrder={showModalShippingOrder}
                      setShowModalShippingOrder={setShowModalShippingOrder}
                    />
                    {/* <ModalConfirmOrder
                      orderId={orderIdChoose}
                      showModalConfirmOrder={showModalConfirmOrder}
                      setShowModalConfirmOrder={setShowModalConfirmOrder}
                    />
                    <ModalCancelOrder
                      orderId={orderIdChoose}
                      showModalCancelOrder={showModalCancelOrder}
                      setShowModalCancelOrder={setShowModalCancelOrder}
                    /> */}
                  </>
                )}

                <button
                  className="!bg-orange-500 button small --jb-modal"
                  type="button"
                  onClick={() => {
                    setShowModalShippingOrder(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span className="icon" title="Chuyển hàng">
                    {/* <i className="mdi mdi-clipboard-edit text-white "></i> */}
                    <i className="mdi mdi-cart-check  text-white "></i>
                  </span>
                </button>

                <button
                  className={`button small green --jb-modal ${
                    false && "disabled:opacity-25"
                  } `}
                  type="button"
                  disabled={false}
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
                  className="button small red --jb-modal"
                  data-target="sample-modal"
                  type="button"
                  onClick={() => {
                    setShowModalCancelOrder(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span className="icon" title="Hủy đơn hàng">
                    <i className="mdi mdi-text-box-remove"></i>
                  </span>
                </button>
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
