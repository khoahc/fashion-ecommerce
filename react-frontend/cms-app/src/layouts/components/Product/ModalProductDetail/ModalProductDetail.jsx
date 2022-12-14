import React, { useEffect, useState } from "react";
import SkeletonModal from "../../../../components/SkeletonModal";
import productApi from "../../../../services/axios/productApi";
import notify from "../../../../utils/notify";

const { getProductDetails } = productApi;

const ModalProductDetail = (props) => {
  const [productDetail, setProductDetail] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getProductDetails(props.id)
      .then((resp) => {
        setIsLoading(false);
        if (resp.status === "OK") {
          return resp.data;
        } else {
          return Promise.reject(new Error(resp.message));
        }
      })
      .then((data) => {
        setProductDetail(data);
      })
      .catch((error) => {
        notify(0, error);
      });
  }, [props.id]);

  const handleClickClose = () => {
    setIsLoading(true);
    props.setShowModal(false);
  };
  return (
    <>
      {props.showModal ? (
        isLoading ? (
          <SkeletonModal />
        ) : (
          <div className="flex justify-center items-center bg-slate-600/60 overflow-x-hidden overflow-y-auto fixed inset-y-0 left-0 lg:left-60 right-0 z-50 outline-none focus:outline-none">
            <div className="relative w-auto my-2 mx-auto max-w-4xl">
              <div className="h-[90vh] w-[700px] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
                  <h3 className="text-2xl font-bold font=semibold m-auto">
                    Thông tin sản phẩm
                  </h3>
                  <button
                    className="bg-transparent border-0 text-black float-right"
                    onClick={handleClickClose}
                  >
                    <span className="icon text-xl ">
                      <i className="mdi mdi-close-circle-outline hover:text-red-600"></i>
                    </span>
                  </button>
                </div>

                <div className=" overflow-auto relative p-6 flex-auto">
                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">ID:</div>
                    <div className="">{productDetail.id}</div>
                  </div>
                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Tên:</div>
                    <div className="">{productDetail.name}</div>
                  </div>
                  <div className="flex flex-row gap-6 mb-4">
                    <div className="font-bold">Loại:</div>
                    <div className="">{productDetail.category.name}</div>
                  </div>
                  <div className="flex flex-row gap-6">
                    <div className="font-bold">Mô tả:</div>
                  </div>
                  <p className="mb-4">{productDetail.description}</p>
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

export default ModalProductDetail;
