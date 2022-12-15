import _ from "lodash";
import { useState } from "react";
import EmptyBodyTable from "../../../../components/EmptyBodyTable";
import LoadingTableContent from "../../../../components/LoadingTableContent/LoadingTableContent";
import ModalOrderDetail from "../../../../components/ModalOrderDetail/ModalOrderDetail";
import numberWithDot from "../../../../utils/numberWithDot";
import ModalDeliver from "../ModalDeliver/ModalDeliver";

const DeliveryTable = ({ list, isLoading, pageSize, currentPage }) => {
  return (
    <table>
      <thead>
        <tr>
          <th className="checkbox-cell">
            <label className="checkbox">
              <input type="checkbox"></input>
              <span className="check"></span>
            </label>
          </th>
          <th>STT</th>
          <th>Người mua</th>
          <th>Số điện thoại</th>
          <th>Thời gian đặt</th>
          <th>Tổng tiền</th>
          <th className="text-center">Trạng thái</th>
          <th className="text-center">Chức năng</th>
        </tr>
      </thead>
      <tbody>
        {isLoading ? (
          <LoadingTableContent colSpan={11} />
        ) : (
          <DeliveryTableContent
            listOrder={list}
            pageSize={pageSize}
            currentPage={currentPage}
          />
        )}
      </tbody>
    </table>
  );
};

const DeliveryTableContent = (props) => {
  const colorOrderStatus = [
    {
      key: 1,
      status: "Đã đóng gói",
      style: "bg-red-500  text-white rounded-full p-2",
    },
    {
      key: 2,
      status: "Đang giao hàng",
      style: "bg-red-500  text-white rounded-full p-2",
    },
    {
      key: 3,
      status: "Đã giao hàng",
      style: "bg-red-500  text-white rounded-full p-2",
    },
  ];

  const [orderIdChoose, setOrderIdChoose] = useState(null);
  const [showModalViewOrderDetail, setShowModalViewOrderDetail] =
    useState(false);
  const [showModalDeliver, setShowModalDeliver] = useState(false);
  const [showModalDelivered, setShowModalDelivered] = useState(false);

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
              {index + props.pageSize * (props.currentPage - 1) + 1}
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
                title={item.orderStatus}
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
                    setShowModalDeliver(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span className="icon" title="Giao hàng">
                    <i className="mdi mdi-truck-delivery  text-white "></i>
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
                    setShowModalDelivered(true);
                    setOrderIdChoose(item.id);
                  }}
                >
                  <span className="icon" title="Đã giao hàng">
                    <i className="mdi mdi-truck-check"></i>
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
                    {showModalDeliver && (
                      <ModalDeliver
                        orderId={orderIdChoose}
                        showModal={showModalDeliver}
                        setShowModal={setShowModalDeliver}
                      />
                    )}
                    {/* {showModalConfirmOrder && (
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
                    )} */}
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

export default DeliveryTable;
