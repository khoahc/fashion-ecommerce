import * as httpRequest from "../utils/httpRequest"
import { handleError } from "../utils/handleError"

export const getOrderTracker = async(orderId, email) => {
  try {
    const res = await httpRequest.get(`/order/order-tracker`, {
      params: {
        orderId,
        email,
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }
}

