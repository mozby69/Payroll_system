import api from "./axios";

export const fetchBranches = async (): Promise<Branches []> => {
    const response = await api.get("/branches");
    return response.data;
};