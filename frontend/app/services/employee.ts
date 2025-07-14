import api from "./axios";
import { Employee } from "../types/types";
import { employeesDetails } from "../types/types";
  

type EmployeeResponse = {
    data: Employee[];
    pagination: {
      total: number;
      totalPages: number;
      currentPage: number;
      perPage: number;
    };
};


export const fetchEmployees = async (page: number, limit: number, search: string = "") => {
    const response = await api.get<EmployeeResponse>("/employees-list", {params: { page, limit, search }});
    return response.data;
};
  

export const fetchAllEmployeesDetails = async (search:string = "",limit:number = 20,page:number = 1) => {
  const response = await api.get<employeesDetails[]>('/DisplayAllEmployees',{params:{search,limit,page}});
  return response.data;
} 