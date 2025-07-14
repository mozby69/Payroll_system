import api from "./axios";
import {PreparePayroll,PreparePayrollResponse} from "@/app/types/types";
import { Employee } from "@/app/types/types";



export const FetchEmployeesPayroll = async(page:number,limit:number,search:string = "", paycode: string = ""):Promise <PreparePayrollResponse> => {
    const response = await api.get<PreparePayrollResponse>("/employees_payroll", {params: {page,limit,search,paycode}});
    return response.data;
}

export const UpdateEmployeePayroll = async (data: PreparePayroll) => {
    const { PayCode, EmpCodeId, ...rest } = data;
    const response = await api.put(`/updatePayrollEntry/${PayCode}/${EmpCodeId}`,rest);
    return response.data;
};

export const SavePayrollToArchive = async ({paycode,totals,computedData }: {
    paycode: string;
    totals: {
      Total_Late: number;
      Total_Absent: number;
      Total_OverTimePay: number;
    };
    computedData: PreparePayroll[];
  }) => {
    const response = await api.post("/savepayrollarchive", {paycode,totals,computedData});
    return response.data;
  };
  



export const fetchAvailableEmployees = async (): Promise<Employee[]> => {
    const response = await api.get<Employee[]>('/getAvailableEmployees');
    return response.data.map(emp => ({...emp,
      EmpCode: emp.EmpCode.trim(), 
      Firstname: emp.Firstname?.trim() ?? null,
      Lastname: emp.Lastname?.trim() ?? null,
    }));
}


export const saveEmployeePayroll = async ({EmpCodeId,basic_salary,pagibig_employee_share,pagibig_employer_share,sss_employee_share,sss_employer_share}: {
  EmpCodeId: string;
  basic_salary: number;
  pagibig_employee_share:number;
  pagibig_employer_share:number;
  sss_employee_share:number;
  sss_employer_share:number;
}) => {
  const response = await api.post("/SaveNewEmployeePayroll", {
    EmpCodeId,
    basic_salary,
    pagibig_employee_share,
    pagibig_employer_share,
    sss_employee_share,
    sss_employer_share,
  });
  return response.data;
};


export const FetchAllEmployeesPayroll = async (selectedPayCode: string) => {
  const response = await api.get(`/getAllEmployeesPayrollByPayCode?paycode=${selectedPayCode}`);
  return response.data;
};


export const fetchPhilhealthRate = async () => {
  const response = await api.get('/getPayrollParameter');
  return response.data;
};

