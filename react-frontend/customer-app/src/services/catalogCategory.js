import { handleError } from "../utils/handleError";
import * as httpRequest from "../utils/httpRequest";

export const getCategoryBySlug = async (slug, color, price) => {
  try {
    const res = await httpRequest.get(`category/${slug}`, {
      params: {
        color,
        price,
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getAllProductBySlugCategory = async (slug, color, price) => {
  try {
    const res = await httpRequest.get(`/product/catalog/${slug}`, {
      params: {
        color,
        price,
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getMenuCategory = async (slug) => {
  try {
    const res = await httpRequest.get(`/category/menu/${slug}`);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getAllRootCategory = async () => {
  try {
    const res = await httpRequest.get(`/category/root`);

    return res;
  } catch (error) {
    handleError(error);
  }
};
