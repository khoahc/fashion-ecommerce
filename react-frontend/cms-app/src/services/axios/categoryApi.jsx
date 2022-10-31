import { axiosClient, axiosClientMultipart } from "./axiosClient";

const categoryApi = {
    getAllCategories: async () => {
        const url = `/api/v1/categories`;
        return await axiosClient.get(url);
    },

    getAllLevel3Categories: async () => {
        const url = `/api/v1/categories/level-3`;
        return await axiosClient.get(url);
    },

    createCategory: async (requestOption) => {
        const url = `/api/v1/categories`;
        return await axiosClient.post(url, requestOption);
    },

    getCategoryDetails: async (id) => {
        const url = `/api/v1/categories/${id}`;
        return await axiosClient.get(url);
    },

    updateCategory: async (id, requestOption) => {
        const url = `/api/v1/categories/${id}`;
        return await axiosClient.put(url, requestOption);
    },

    deleteCategory: async () => {

    },

    uploadImageCategory: async (requestOption) => {
        const url = `/api/v1/categories/image`;
        return await axiosClientMultipart.post(url, requestOption);
    },
};

export default categoryApi;