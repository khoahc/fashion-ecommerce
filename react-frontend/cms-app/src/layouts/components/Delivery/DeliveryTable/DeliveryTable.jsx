import _ from "lodash";
import { useState } from "react";
import EmptyBodyTable from "../../../../components/EmptyBodyTable";
import LoadingTableContent from "../../../../components/LoadingTableContent/LoadingTableContent";
import ModalOrderDetail from "../../../../components/ModalOrderDetail/ModalOrderDetail";
import numberWithDot from "../../../../utils/numberWithDot";
import ModalDeliver from "../ModalDeliver/ModalDeliver";
import ModalDelivered from "../ModalDelivered/ModalDelivered";

const DeliveryTable = ({ list, isLoading, pageSize, currentPage, reloadData }) => {

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
          <th>Địa chỉ</th>
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
            reloadData={reloadData}
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
      style: "bg-orange-500 text-white font-bold rounded-full p-2",
    },
    {
      key: 2,
      status: "Đang giao hàng",
      style: "bg-amber-400  text-white font-bold rounded-full p-2",
    },
    {
      key: 3,
      status: "Đã nhận hàng",
      style: "bg-red-500  text-white font-bold rounded-full p-2",
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
          <tr key={item.id}>
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
            <td
              data-label="create-time"
              className={`${item.cancelled && "line-through"} `}
            >
              <small
                className={`${
                  item.cancelled && "line-through"
                } text-gray-500 text-sm`}
                title={item.createTime}
              >
                {item.address}
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
              <div className="flex justify-center items-center">
                <small
                  className={`text-sm block w-fit 
              ${
                colorOrderStatus.find((elem) =>
                  _.isEqual(item.orderStatus, elem.status)
                ).style
              }`}
                  title={item.orderStatus}
                >
                  {item.orderStatus}
                </small>
              </div>
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
                  <span className="icon" title="Nhận giao hàng">
                    <i className="mdi mdi-truck-delivery  text-white "></i>
                  </span>
                </button>

                <button
                  className={`button small green --jb-modal ${
                    (!item.shipping || item.delivered) && "disabled:opacity-25"
                  } `}
                  type="button"
                  disabled={!item.shipping || item.delivered}
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
                        reloadData={props.reloadData}
                      />
                    )}
                    {showModalDelivered && (
                      <ModalDelivered
                        orderId={orderIdChoose}
                        showModal={showModalDelivered}
                        setShowModal={setShowModalDelivered}
                        reloadData={props.reloadData}
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

export default DeliveryTable;
