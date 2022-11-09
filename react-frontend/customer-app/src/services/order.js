import * as httpRequest from '../utils/httpRequest'
import { handleError } from '../utils/handleError'

export const postOrder = async(data) => {
  try {
    const res = await httpRequest.post(`order`, data)
    return res;
  } catch (error) {
    handleError(error);
  }    
}


export const verifyOrder = async (code) => {
  try {
    const res = await httpRequest.get(`order/verify`, {
      params: {
        code,      
      },
    });

    return res;
  } catch (error) {
    handleError(error);
  }    
}

