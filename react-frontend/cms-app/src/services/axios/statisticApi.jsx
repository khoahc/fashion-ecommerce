import { axiosClient } from "./axiosClient";

export const getRevenueOfYear = async (year) => {
  const url = `/api/v1/statistic/revenue-year/${year}`;
  return await axiosClient.get(url);
};

export const getRevenueOfMonth = async (month, year) => {
  const url = `/api/v1/statistic/revenue-month`;
  return await axiosClient.get(url, {
    params: {
      month,
      year
    }
  });
};

export const getQuantityProduct = async () => {
  const url = `/api/v1/statistic/quantity-product`;
  return await axiosClient.get(url);
};

export const getQuantityOrder = async () => {
  const url = `/api/v1/statistic/quantity-order`;
  return await axiosClient.get(url);
};

export const getTotalRevenue = async () => {
  const url = `/api/v1/statistic/total-revenue`;
  return await axiosClient.get(url);
};
