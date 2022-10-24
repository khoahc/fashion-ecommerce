import axiosClient from "./axiosClient";

const categoryApi = {
    getAllCategories: async () => {
        const url = `/api/v1/categories`;
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

    updateCategory: async () => {
        const config = {
            headers: {
                Authorization: localStorage.getItem('jwt'),
            },
        };
        const url = `/api/v1/categories`;
        return await axiosClient.get(url, config);
    },

    deleteCategory: async () => {

    },
};

export default categoryApi;