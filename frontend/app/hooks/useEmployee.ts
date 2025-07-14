import { useQuery } from "@tanstack/react-query";
import { fetchEmployees,fetchAllEmployeesDetails } from "../services/employee";

export const useEmployees = (page: number, limit: number, search: string) => {
    return useQuery({
      queryKey: ["employees", page, limit, search],
      queryFn: () => fetchEmployees(page, limit, search),

    });
};


export const useDisplayAllEmployee = (search:string,limit:number,page:number) => {
  return useQuery({
    queryKey:["allemployees",search,limit,page],
    queryFn: () => fetchAllEmployeesDetails(search,limit,page),
  });
};



