import authHeader from './authHeader';
import { axiosClient, axiosClientMultipart } from './axiosClient';

const userApi = {
    loginWithEmail: async (requestOption) => {
      const url = `/auth/login`;
      return await axiosClient.post(url, requestOption);
    },
  
    registerWithEmail: async (requestOption) => {
      const url = `account/register`;
      return await axiosClient.post(url, requestOption);
    },
    forgotPassword: async (requestOption) => {
      const url = `account/forgot-password`;
      return await axiosClient.post(url, requestOption);
    },

    getInfo: async (config) => {
      const url = `/api/v1/my`;
      return await axiosClient.get(url, config);
    },

    // ========================================= //

    getAllUser: async ({params}) => {
      const url = `/api/v1/users`;
      return await axiosClient.get(url, {params});
    },

    getUserDetail: async (id) => {
      const url = `/api/v1/users/${id}`;
      return await axiosClient.get(url);
    },

    uploadPhotoUser: async (requestOption) => {
      const url = `/api/v1/users/photos`;
      return await axiosClientMultipart.post(url, requestOption);
    },

    createUser: async (requestOption) => {
      const url = `/api/v1/users`;
      return await axiosClient.post(url, requestOption);
    },

    updateUser: async (id, requestOption) => {
      const url = `/api/v1/users/${id}`;
      return await axiosClient.put(url, requestOption);
    },

    deleteUser: async (id) => {
      const url = `/api/v1/users/${id}`;
      return await axiosClient.delete(url, { headers: authHeader});
    },
  };
  
  export default userApi;