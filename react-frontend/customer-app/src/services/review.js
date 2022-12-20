import * as httpRequest from '../utils/httpRequest'
import { handleError } from '../utils/handleError'

export const postReview = async(data) => {
  try {
    const res = await httpRequest.post(`review`, data)
    return res;
  } catch (error) {
    handleError(error);
  }    
}


export const getReviewsByProductSlug = async (productSlug) => {
  try {
    const res = await httpRequest.get(`review/${productSlug}`);
    return res;
  } catch (error) {
    handleError(error);
  }    
}

