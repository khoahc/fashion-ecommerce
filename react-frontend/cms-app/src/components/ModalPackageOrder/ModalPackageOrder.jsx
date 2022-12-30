import React from "react";
import { ToastContainer } from "react-toastify";
import { addOrderTrackPackageByOrderId } from "../../services/axios/orderApi";
import notify from "../../utils/notify";

const ModalPackageOrder = (props) => {
  const handleConfirm = () => {
    addOrderTrackPackageByOrderId({
      orderId: props.orderId,
    })
      .then((response) => {
        if (response.status === "OK") {
          props.setShowModalShippingOrder(false);
          notify(1, "Xác nhận thành công");
          console.log(response);
        } else {
          props.setShowModalShippingOrder(false);
          notify(0, "Xác nhận thất bại!");          
          return Promise.reject(new Error(response.message));
        }
        props.reloadData();
      })
      .catch(function (error) {
        props.setShowModalShippingOrder(false);
        notify(0, "Xác nhận thất bại!");
        console.log(error);
      });
  };
  const handleClickClose = () => {
    props.setShowModalShippingOrder(false);
  };

  return (
    <>
      {props.showModalShippingOrder && (
        <div className="flex justify-center items-center bg-slate-600/60 overflow-x-hidden overflow-y-auto fixed inset-y-0 left-0 lg:left-60 right-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-2 mx-auto max-w-4xl">
            <div className="h-[220px] w-[300px] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-2xl font-bold font=semibold m-auto">
                  Xác nhận
                </h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => {
                    props.setShowModalShippingOrder(false);
                  }}
                >
                  <span className="icon text-xl ">
                    <i className="mdi mdi-close-circle-outline hover:text-red-600"></i>
                  </span>
                </button>
              </div>

              <div className="mx-4 mt-3 font-medium text-center">
                Bạn có muốn xác đóng gói đơn hàng này không?
              </div>

              <div className="flex items-center gap-5 justify-center p-6  rounded-b">
                <button
                  className="hover:bg-orange-500 hover:text-white  text-orange-500 font-bold rounded-xl border-2 border-[#999] uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleConfirm}
                >
                  Xác nhận
                </button>
                <button
                  className="hover:bg-red-700 hover:text-white  text-red-700 font-bold rounded-xl border-2 border-[#999] uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={handleClickClose}
                >
                  Không
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer
        position="bottom-right"
        autoClose={500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};

export default ModalPackageOrder;
