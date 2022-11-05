import * as httpRequest from '../utils/httpRequest'


const handleError = (error) => {
  if (error.response) {
    // The request was made and the server responded with a status code
    // that falls out of the range of 2xx
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  } else if (error.request) {
    // The request was made but no response was received
    // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    // http.ClientRequest in node.js
    console.log(error.request);
  } else {
    // Something happened in setting up the request that triggered an Error
    console.log("Error", error.message);
  }
  console.log(error.config);
}

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
