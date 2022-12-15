import { axiosClient } from "./axiosClient";

export const getAllOrderToDeliver = async ({ params }) => {
  const url = `/api/v1/deliveries`;
  return await axiosClient.get(url, { params });
};

export const deliverOder = async (id) => {
  const url = `/api/v1/deliveries/deliver/${id}`;
  return await axiosClient.put(url);
};

export const deliveredOder = async (id) => {
  const url = `/api/v1/deliveries/delivered/${id}`;
  return await axiosClient.put(url);
};
