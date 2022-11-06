import { axiosClient } from './axiosClient';

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

    getInfo: async () => {
      const url = `/api/v1/my`;
      return await axiosClient.get(url);
    },

    getAllUser: async () => {
      const url = `/api/v1/users`;
      return await axiosClient.get(url);
    },

    getUserDetail: async (id) => {
      const url = `/api/v1/users/${id}`;
      return await axiosClient.get(url);
    },

    createUser: async (requestOption) => {
      const url = `/api/v1/users`;
      return await axiosClient.post(url, requestOption);
    },
  };
  
  export default userApi;