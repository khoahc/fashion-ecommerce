import axios from "axios";

const httpRequest = axios.create({
  // baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: "http://lizi-fashion.online:81/lizi/api/v1/",
  baseURL: "http://localhost:81/lizi/api/v1/",
});

export const get = async (path, options = {}) => {
  const response = await httpRequest.get(path, options);
  return response.data;
};

export const post = async (path, data = {}) => {
  const response = await httpRequest.post(path, data);
  return response.data;
};
export default httpRequest;
