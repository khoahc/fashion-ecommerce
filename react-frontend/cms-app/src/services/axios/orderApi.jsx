import { axiosClient } from "./axiosClient";

export const getAllOrder = async () => {
  const url = `/api/v1/orders`;
  return await axiosClient.get(url);
};

export const getOrderDetailByOrderId = async (id) => {
  const url = `/api/v1/orders/${id}`;
  return await axiosClient.get(url);
};

export const browserOrder = async (requestOption) => {
  const url = `/api/v1/orders`;
  return await axiosClient.post(url, requestOption);
};

export const cancelOrder = async (id) => {
  const url = `/api/v1/orders/${id}`;
  return await axiosClient.get(url);
};
