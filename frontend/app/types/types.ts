
export interface Column{
    header:string;
    accessor:string;
}
export type TableProps = {
    columns: Column[];
    data: any[];
    withPagination?: boolean;
    currentPage?: number;
    totalPages?: number;
    onPageChange?: (page: number) => void;
  };

export interface User {
    id?: string;
    username: string;
    email: string;
    password: string;
}

export type PreparePayroll = {
    PayCode: string;
    EmpCodeId: string;
    LateCount: string;
    TotalHoursWorked?:string;
    TotalAbsentHours: string;
    TotalUndertime?: string;
    TotalOvertime: string;
    basic_salary:string;
    OvertimeAtt?:string;
    NightShiftAtt?:string;
    RegularAtt?:string;
    NightShiftOtAtt?:string;
    GrossPay:number;
    sss_employee_share:number;
    LateDeduction?:string;
    Netpay:string;
    pagibig_employee_share:number;
    philhealth:string;
};

export type PreparePayrollResponse = {
    data: PreparePayroll[];
    payCodeOptions: string[];
    pagination:{
        total:number;
        totalPages:number;
        currentPage:number;
        perPage:number;
    };
};

export type Employee = {
    EmpCode: string;
    Firstname: string | null;
    Middlename:string | null;
    Lastname:string | null;
    Gender: string | null;
    DateofBirth: string | null;
    CivilStatus: string | null;
};

export interface employeesDetails{
    EmpCode:string;
    Firstname:string;
    Middlename:string;
    Lastname:string;
    EmployementDate:string;
    Department:string;
    Address:string;
    BranchCodeId:string;
    Position:string;
    
  }
  

export interface philhealth_rate_types {
      SettingPercentage: string;
};
  
export type ModalKey = 'PreparePayrollView_ModalKey' | 'Add_Employee_Payroll_ModalKey';
    
export type ModalConfig = {
    key: ModalKey;
    title: string;
    size: "large" | "medium" | "small" | "xlarge" | "custom";
    getData?: () => 
        PreparePayroll |
        null | 
        undefined;
};