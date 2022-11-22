import { axiosClient } from "./axiosClient";

export const getAllOrder = async ({params}) => {
  const url = `/api/v1/orders`;
  return await axiosClient.get(url, {params});
};

export const getOrderDetailByOrderId = async (id) => {
  const url = `/api/v1/orders/${id}`;
  return await axiosClient.get(url);
};

export const addOrderTrackShippingByOrderId = async (requestOrderId) => {
  const url = `/api/v1/order-track/shipping`;
  return await axiosClient.post(url, requestOrderId);
};

export const addOrderTrackVerifiedByOrderId = async (requestOrderId) => {
  const url = `/api/v1/order-track/verified`;
  return await axiosClient.post(url, requestOrderId);
};

export const addOrderTrackCancelledByOrderId = async (requestOrderId) => {
  const url = `/api/v1/order-track/cancelled`;
  return await axiosClient.post(url, requestOrderId);
};
