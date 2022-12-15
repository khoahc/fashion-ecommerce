import { axiosClient } from "./axiosClient";

export const getAllOrderToDeliver = async ({ params }) => {
  const url = `/api/v1/deliveries`;
  return await axiosClient.get(url, params);
};
