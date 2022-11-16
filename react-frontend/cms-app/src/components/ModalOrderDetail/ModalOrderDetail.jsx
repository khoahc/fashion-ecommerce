import React from "react";

const ModalOrderDetail = (props) => { 

  return (
    <>
    {console.log('props.id', props.orderId)}
      {props.showModal ? (
        <div className="flex justify-center items-center bg-slate-600/60 overflow-x-hidden overflow-y-auto fixed inset-y-0 left-60 right-0 z-50 outline-none focus:outline-none">
          <div className="relative w-auto my-2 mx-auto max-w-4xl">
            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
              <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                <h3 className="text-3xl font=semibold">General Info</h3>
                <button
                  className="bg-transparent border-0 text-black float-right"
                  onClick={() => props.setShowModal(false)}
                >
                  <span className="text-black opacity-7 h-6 w-6 text-xl block bg-gray-400 py-0 rounded-full">
                    x
                  </span>
                </button>
              </div>
              <div className="relative p-6 flex-auto">             
              
                <div className="flex flex-row gap-6 mb-4">
                  <div className="font-bold">Mã đơn hàng</div>
                  <div className="">{props.orderId}</div>
                </div>

                <div className="flex flex-row gap-6 mb-4">
                  <div className="font-bold">Mã đơn hàng</div>
                  <div className="">1243</div>
                </div>

                <div className="flex flex-row gap-6 mb-4">
                  <div className="font-bold">Mã đơn hàng</div>
                  <div className="">1243</div>
                </div>

                <div className="flex flex-row gap-6 mb-4">
                  <div className="font-bold">Mã đơn hàng</div>
                  <div className="">1243</div>
                </div>
              </div>

              <div className="flex items-center justify-center p-6 border-t border-solid border-blueGray-200 rounded-b">
                <button
                  className="text-red-500 font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1"
                  type="button"
                  onClick={() => props.setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ModalOrderDetail;
