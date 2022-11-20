import React, { useEffect, useState } from "react";
import TrackList from "../../components/TrackList";
import { getOrderDetailByOrderId } from "../../services/axios/orderApi";
import numberWithDot from "../../utils/numberWithDot";
import ProductOrder from "../ProductOrder/ProductOrder";
import SkeletonModal from "../SkeletonModal";

const ModalOrderDetail = (props) => {
  const [orderDetail, setOrderDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getOrderDetailByOrderId(props.orderId)
      .then((data) => {
        console.log("data :>> ", data);
        if (data.status === "OK") {
          setOrderDetail(() => data.data);
          setIsLoading(false);
        } else {
          return Promise.reject(new Error(data.message));
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [props.orderId]);

  const handleClickClose = () => {
    props.setShowModalViewOrderDetail(false);
  };

  console.log("orderDetail.products", orderDetail.products);
  console.log("setIsLoading(false) :>> ", isLoading);
  return (
    <>
      {console.log("props.id", props.orderId)}
      {props.showModalViewOrderDetail ? (
        isLoading ? (
          <SkeletonModal />
        ) : (
          <div className="flex justify-center items-center bg-slate-600/60 overflow-x-hidden overflow-y-auto fixed inset-y-0 left-0 lg:left-60 right-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto max-w-4xl">
              <div className="h-[90vh] w-[700px] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font-bold font=semibold m-auto">
                    Thông tin đơn hàng
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={() => props.setShowModalViewOrderDetail(false)}
                  >
                    <span className="icon text-xl ">
                      <i className="mdi mdi-close-circle-outline hover:text-red-600"></i>
                    </span>
                  </button>
                </div>
                <div className=" overflow-auto relative p-6 flex-auto">
                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Mã đơn hàng:</div>
                    <div className="">{orderDetail.id}</div>
                  </div>
                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Thời gian đặt hàng:</div>
                    <div className="font-light italic">
                      {orderDetail.orderTime}
                    </div>
                  </div>
                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Người nhận:</div>
                    <div className="">{orderDetail.receiverName}</div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">SĐT:</div>
                    <div className="">{orderDetail.phoneNumber}</div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Email: </div>
                    <div className="">{orderDetail.email}</div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Địa chỉ: </div>
                    <div className="">{orderDetail.address}</div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Tổng tiền: </div>
                    <div className="font-bold">
                      {numberWithDot(Number(orderDetail.totalPrice))} đ{" "}
                    </div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Phí ship: </div>
                    <div className="">
                      {numberWithDot(Number(orderDetail.shipCost))} đ
                    </div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Phương thức thanh toán: </div>
                    <div className="">
                      {orderDetail.paymentMethod === "PAYMENT_ON_DELIVERY"
                        ? "Thanh toán khi nhận hàng"
                        : "Thanh toán online"}
                    </div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Trạng thái: </div>
                    <div className="text-green-600">
                      {orderDetail.orderStatus}
                    </div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Danh sách sản phẩm: </div>
                  </div>

                  {orderDetail.products.map((item, index) => (
                    <ProductOrder key={index} data={item} />
                  ))}

                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Theo dõi đơn hàng: </div>
                  </div>
                  <TrackList data={orderDetail.orderTrackResDtoList} />
                </div>

                <div className="flex items-center justify-center p-6  rounded-b">
                  <button
                    className="hover:bg-black hover:text-white  text-red-500 font-bold rounded-xl border-2 border-[#999] uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                    type="button"
                    onClick={handleClickClose}
                  >
                    Thoát
                  </button>
                </div>
              </div>
            </div>
          </div>
        )
      ) : null}
    </>
  );
};

export default ModalOrderDetail;
