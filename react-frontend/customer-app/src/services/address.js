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

export const getAllProvince = async() => {
  try {
    const res = await httpRequest.get(`province`)
    return res;
  } catch (error) {
    handleError(error);
  }    
}

export const getDistrictsByProvinceId = async(provinceId) => {
  try {
    const res = await httpRequest.get(`district/${provinceId}`)
    return res;
  } catch (error) {
    handleError(error);
  }    
}

export const getWardsByDistrictId = async(districtId) => {
  try {
    const res = await httpRequest.get(`ward/${districtId}`)
    return res;
  } catch (error) {
    handleError(error);
  }    
}

