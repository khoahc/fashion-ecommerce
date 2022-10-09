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
    console.log(error);
  }
};
