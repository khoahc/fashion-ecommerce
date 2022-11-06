import { axiosClient } from "./axiosClient";

const roleApi = {
    getAllRole: async () => {
        const url = `/api/v1/roles`;
        return await axiosClient.get(url);
    },
};

export default roleApi;