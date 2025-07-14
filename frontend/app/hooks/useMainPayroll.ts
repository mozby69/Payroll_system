import { useQuery } from "@tanstack/react-query";
import { FetchFilterEmployees } from "../services/MainPayroll";

export const useGetFilterEmployees = (branchCode: string, page: number, perPage: number, search: string) => {
    return useQuery({
        queryKey: ["filter_employees", branchCode, page, perPage, search],
        queryFn: ()=>FetchFilterEmployees(branchCode, page, perPage, search),
    });
};