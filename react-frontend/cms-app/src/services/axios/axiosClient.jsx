import axios from 'axios';
import useToken from '../../utils/useToken';

const { token } = useToken;


const baseURL = process.env.URL_MY_API || "http://localhost:8081/lizi-cms";
const axiosClient = axios.create({
  baseURL: baseURL,
  headers: {
    'Content-Type': 'application/json',
    Authorization: token,
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
    throw error;
  },
);

export default axiosClient;