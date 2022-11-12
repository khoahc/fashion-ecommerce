import { handleError } from "../utils/handleError";
import httpRequest from "../utils/httpRequest";

export const getProductDetailBySlug = async (slug, color, size) => {
  try {
    const res = await httpRequest.get(`product/${slug}`, {
      params: {
        color,
        size,
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getTopSellingProducts = async () => {
  try {
    const res = await httpRequest.get(`product/top-selling-products`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getTopNewProducts = async () => {
  try {
    const res = await httpRequest.get(`product/top-new-products`);
    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getProducts = async (keyword) => {
  try {
    const res = await httpRequest.get(`product`, {
      params: {
        keyword,
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }
};
