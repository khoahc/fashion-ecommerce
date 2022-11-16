import React, { useState } from "react";
import { Link } from "react-router-dom";
import numberWithDot from "../../utils/numberWithDot";
import EmptyBodyTable from "../EmptyBodyTable";
import ModalOrderDetail from "../ModalOrderDetail/ModalOrderDetail";

const OrderTableContent = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [orderIdChoose, setOrderIdChoose] = useState(null);

  console.log("props.listOrder", props.listOrder);

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
              <small className="text-gray-500" title={item.createTime}>
                {item.orderTime}
              </small>
            </td>

            <td data-label="total-price">{numberWithDot(item.totalPrice)} đ</td>

            <td className="actions-cell">
              <div className="buttons right nowrap">
                {/* <Link
              to={`/order/${item.id}`}
              class="button small green --jb-modal"
            >
              <span class="icon">
                <i class="mdi mdi-eye"></i>
              </span>
            </Link> */}
                <button
                  className="!bg-blue-400 text-black hover:!bg-blue-700 font-bold px-[0.35rem] py-[0.31rem] rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1"
                  type="button"
                  onClick={() => {
                    setShowModal(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span class="icon">
                    <i class="mdi mdi-eye"></i>
                  </span>
                </button>

                <ModalOrderDetail
                  orderId={orderIdChoose}
                  showModal={showModal}
                  setShowModal={setShowModal}
                />

                <Link
                  to={`/order/${item.id}`}
                  className="button small green --jb-modal"
                >
                  <span className="icon" title="Duyệt đơn hàng">
                    <i className="mdi mdi-text-box-check"></i>
                  </span>
                </Link>
                <button
                  className="button small red --jb-modal"
                  data-target="sample-modal"
                  type="button"
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
