import { axiosClient, axiosClientMultipart } from "./axiosClient";

const categoryApi = {

    getAllCategories: async ({params}) => {
        const url = `/api/v1/categories`;
        return await axiosClient.get(url, {params});
    },

    getAllCategoriesPagination: async () => {
        const url = `/api/v1/categories`;
        return await axiosClient.get(url);
    },

    getAllLevel3Categories: async () => {
        const url = `/api/v1/categories/level-3`;
        return await axiosClient.get(url);
    },

    getByLevel: async (level, id) => {
        const url = id ? `/api/v1/categories/level/${level}?id=${id}` : `/api/v1/categories/level/${level}`;
        return await axiosClient.get(url);
    },

    getChildren: async (id) => {
        const url = `/api/v1/categories/${id}/children`;
        return await axiosClient.get(url);
    },

    getAllLevel1And2Categories: async () => {
        const url = `/api/v1/categories/level-1-2`;
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

    deleteCategory: async (id) => {
        const url = `/api/v1/categories/${id}`;
        return await axiosClient.delete(url);
    },

    uploadImageCategory: async (requestOption) => {
        const url = `/api/v1/categories/image`;
        return await axiosClientMultipart.post(url, requestOption);
    },
};

export default categoryApi;