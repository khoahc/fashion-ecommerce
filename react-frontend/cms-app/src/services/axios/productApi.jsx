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
};

export default productApi;