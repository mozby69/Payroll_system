import api from "./axios"

export const FetchFilterEmployees = async (
    branchCode: string,
    page: number,
    perPage: number,
    search: string,
) => {
    const response = await api.get("/filter-employees",{
        params: { branchCode, page, perPage, search }
    })
    return response.data;
}