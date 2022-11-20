import { handleError } from "../utils/handleError";
import * as httpRequest from "../utils/httpRequest";

export const getAllColorsBySlugCategoty = async (slug) => {
  try {
    const res = await httpRequest.get(`color/${slug}`);

    return res;
  } catch (error) {
    handleError(error);
  }
};

export const getAllColors = async () => {
  try {
    const res = await httpRequest.get(`color`);

    return res;
  } catch (error) {
    handleError(error);
  }
};
