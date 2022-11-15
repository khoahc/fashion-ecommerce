import { axiosClient } from "./axiosClient";

const colorApi = {
    getColors: async (config) => {
        const url = `/api/v1/colors`;
        return await axiosClient.get(url, config);
    }
}

export default colorApi;
