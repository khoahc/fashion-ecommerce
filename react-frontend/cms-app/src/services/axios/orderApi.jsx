import { axiosClient } from "./axiosClient";

const orderApi = {
    getAllOrder: async () => {
        const url = `/api/v1/orders`;
        return await axiosClient.get(url);
    },

    browserOrder: async (requestOption) => {
        const url = `/api/v1/orders`;
        return await axiosClient.post(url, requestOption);
    },

    cancelOrder: async (id) => {
        const url = `/api/v1/orders/${id}`;
        return await axiosClient.get(url);
    },
};

export default orderApi;