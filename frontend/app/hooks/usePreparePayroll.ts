import { useQuery,useMutation, useQueryClient } from "@tanstack/react-query";
import { FetchEmployeesPayroll,UpdateEmployeePayroll,SavePayrollToArchive,fetchAvailableEmployees, saveEmployeePayroll,fetchPhilhealthRate } from "../services/prepare_payroll";
import { PreparePayrollResponse,Employee,philhealth_rate_types} from "../types/types";



export const useEmployeesPayroll = (page: number, limit:  number,paycode:string, search:string) => {
    return useQuery<PreparePayrollResponse>({
      queryKey: ["employees_payroll", page, limit,paycode,search],
      queryFn: () => FetchEmployeesPayroll(page, limit, paycode,search),
      enabled: true,
    });
};

export const useUpdateEmployeePayroll = () => {
    return useMutation({
      mutationFn: UpdateEmployeePayroll,
    });
};

export const useSavePayrollArchive = () => {
  return useMutation({
    mutationFn:SavePayrollToArchive,
  });
};


export const useAvailableEmployees = () => {
  return useQuery<Employee[]>({
    queryKey: ["available_employees"],
    queryFn: fetchAvailableEmployees,
  })
};

export const useSaveEmployeePayroll = () => {
  return useMutation({
    mutationFn:saveEmployeePayroll,
  
  });
};


export const useFetchPhilhealthRAte = () => {
  return useQuery<philhealth_rate_types>({
    queryKey: ["list_philhealthrate"],
    queryFn: fetchPhilhealthRate,
  })
};