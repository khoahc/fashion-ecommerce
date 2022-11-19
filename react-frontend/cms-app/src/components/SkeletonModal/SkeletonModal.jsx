import React from "react";
// import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const SkeletonModal = () => {
  return (
    <>
      <div className="flex justify-center items-center bg-slate-600/60 overflow-x-hidden overflow-y-auto fixed inset-y-0 left-0 lg:left-60 right-0 z-50 outline-none focus:outline-none">
        <div className="relative w-auto my-2 mx-auto max-w-4xl">
          <div className="h-[90vh] w-[700px] border-0 rounded-lg shadow-lg relative flex flex-col bg-white outline-none focus:outline-none">
            <div className="flex items-start justify-between p-5 border-b border-solid border-gray-300 rounded-t ">
              <h3 className="text-2xl font-bold font=semibold m-auto">
                <div class="h-5 bg-gray-200 rounded-full dark:bg-gray-700 w-48"></div>
              </h3>
            </div>
            <div className=" overflow-auto relative p-6 flex-auto">
              <div className="flex flex-row mb-4 ">
                <div role="status" class="w-full animate-pulse m-auto">
                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row gap-6 mb-4">
                    <div class="h-6 bg-gray-200 rounded-full dark:bg-gray-700 w-[30%] mb-2"></div>
                    <div class="h-6 bg-gray-300 rounded-full dark:bg-gray-600 w-[60%] mb-2"></div>
                  </div>

                  <div className="flex flex-row justify-between justify-items-stretch rounded-md ">
                    <div className="w-full h-[180px] flex justify-center items-center  bg-gray-300 rounded dark:bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SkeletonModal;
