import { axiosClient, axiosClientMultipart } from "./axiosClient";

const productApi = {
    getAllProducts: async ({params}) => {
        const url = `/api/v1/products`;
        return await axiosClient.get(url, {params});
    },

    createProduct: async (requestOption) => {
        const url = `/api/v1/products`;
        return await axiosClient.post(url, requestOption);
    },

    getProductDetails: async (id) => {
        const url = `/api/v1/products/${id}`;
        return await axiosClient.get(url);
    },

    updateProduct: async (id, requestOption) => {
        const url = `/api/v1/products/${id}`;
        return await axiosClient.put(url, requestOption);
    },

    deleteProduct: async () => {

    },

    uploadImageProduct: async (requestOption) => {
        const url = `/api/v1/products/image`;
        return await axiosClientMultipart.post(url, requestOption);
    },

    disableProduct: async (id) => {
        const url = `/api/v1/products/${id}/disable`;
        return await axiosClient.put(url);
    },

    enableProduct: async (id) => {
        const url = `/api/v1/products/${id}/enable`;
        return await axiosClient.put(url);
    },

    // product options

    updateQuantitySizeOption: async (id, requestOption) => {
        const url = `/api/v1/products/options/${id}/size`;
        return await axiosClient.put(url, requestOption);
    },

    removeSizeInOption: async (id) => {
        const url = `/api/v1/products/options/${id}/size`;
        return await axiosClient.delete(url);
    },
};

export default productApi;