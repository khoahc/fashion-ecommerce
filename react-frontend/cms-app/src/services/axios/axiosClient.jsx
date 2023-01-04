import axios from 'axios';

// const baseURL = process.env.URL_MY_API || "http://cms.lizi-fashion.online:8080/lizi-cms";
const baseURL = process.env.URL_MY_API || "http://localhost:8081/lizi-cms";

const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    return error;
  },
);

const axiosClientMultipart = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'multipart/form-data',
  },
});

axiosClientMultipart.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    // Handle errors
    return error;
  },
);

export { axiosClient, axiosClientMultipart };