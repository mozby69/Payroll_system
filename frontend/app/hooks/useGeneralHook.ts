import { useQuery } from "@tanstack/react-query"
import { fetchBranches } from "../services/GeneralServer"

export const useFetchBranches = () => {
    return useQuery({
        queryKey: ["branches"],
        queryFn: () => fetchBranches(),
        staleTime: 5 * 60 * 1000, // 5 minutes
    })
}