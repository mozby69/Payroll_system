"use client";
import styles from '@/public/css/prepare_payroll.module.css';
import Table from '@/app/components/Table';
import { Column } from '@/app/types/types';
import { useEmployeesPayroll,useUpdateEmployeePayroll,useSavePayrollArchive } from '@/app/hooks/usePreparePayroll';
import { useState,useEffect,useMemo,useRef } from "react";
import { useDebounce } from "use-debounce";
import SweetAlert from '@/app/components/Swal';
import type {PreparePayroll} from "@/app/types/types";
import Button from '../components/buttons';
import { late } from 'zod';
import MainModal from "@/app/components/ModalJohn";
import { modalConfigMap, getModalContent } from '../lib/ModalRegistry';
import { ModalConfig, ModalKey } from '@/app/types/types';
import { useModal } from '../hooks/customHooks/useModal';
import Table2 from "@/app/components/TableComponent/Table"; 
import Computation from '../components/formula';
import SearchButton from '../components/SearchButton';
import PayrollDropdown from '../ui/PrepareModalComponents/dropdownMonths';
import { FetchAllEmployeesPayroll } from '../services/prepare_payroll';
import { useFetchPhilhealthRAte } from '@/app/hooks/usePreparePayroll';
import { groupPayCodesByMonth } from '../ui/PrepareModalComponents/dropdownMonths';

export default function PreparePayroll(){
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 8;
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch] = useDebounce(searchTerm, 300);
    const [selectedPayCode, setSelectedPayCode] = useState<string>(""); 
    const { data, isLoading,refetch } = useEmployeesPayroll(currentPage, limit, debouncedSearch,selectedPayCode);
    const { mutate: saveArchive, isPending } = useSavePayrollArchive();
    const [computedData, setComputedData] = useState<PreparePayroll[]>([]);
    const { isOpen, modalType, modalKey, rowDataList, openModal: openModal2, closeModal  } = useModal<ModalKey>();
    const totalPages = data?.pagination.totalPages || 1;
    const [tableData, setTableData] = useState<any[]>([]);
    const {data: philhealth_data} = useFetchPhilhealthRAte();
    const philhealthRate = parseFloat(philhealth_data?.SettingPercentage || "0");

    const monthOrder = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const groupedPayCodesUnsorted = groupPayCodesByMonth(data?.payCodeOptions || []);
    const groupedPayCodes = Object.fromEntries(
      Object.entries(groupedPayCodesUnsorted).sort(
        ([monthA], [monthB]) =>
          monthOrder.indexOf(monthA) - monthOrder.indexOf(monthB)
      )
    );
    
  


    useEffect(() => {
      if (!data?.data) return;
        const backendData = data.data.map(emp => {
        const total = Computation.all(emp,philhealthRate,selectedPayCode);
        const {TotalUndertime,TotalHoursWorked,LateDeduction,OvertimeAtt,NightShiftAtt,RegularAtt,NightShiftOtAtt,...filteredEmp} = emp;

    
        return {
          ...filteredEmp,
          LateCount: total.late_result,
          TotalAbsentHours: total.absent_result,
          TotalOvertime: total.totalOvertimeAmount.toFixed(2),
          GrossPay: total.final_grosspay,
          Netpay:total.net_pay.toFixed(2),
          basic_salary:total.basic_pay.toFixed(2),
          philhealth:total.philhealth_cont.toFixed(2),
          sss_employee_share:total.sss_result,
          pagibig_employee_share:total.pagibig_result,
        };
      });
      const uiData = backendData.map(row => ({...row,
        action: (
          <button
            className={styles.viewButton}
            onClick={() => openModal2("PreparePayrollView_ModalKey", "view", row)
            }>View</button>
        ),
      }));
      setComputedData(backendData); 
      setTableData(uiData);    
    }, [data]);
    
    






    const handleSavePayroll = async () => {
      if (!selectedPayCode) {
        SweetAlert.errorAlert("Select a payroll date first.");
        return;
      }
    
      try {
        const allEmployeeData = await FetchAllEmployeesPayroll(selectedPayCode);
    
        const backendData = allEmployeeData.map((emp: PreparePayroll) => {
          const total = Computation.all(emp,philhealthRate,selectedPayCode);
          return {
            PayCode:emp.PayCode,
            EmpCodeId:emp.EmpCodeId,
            LateCount: total.late_result,
            TotalAbsentHours: total.absent_result,
            TotalOvertime: total.totalOvertimeAmount.toFixed(2),
            GrossPay: total.final_grosspay,
            sss_employee_share: emp.sss_employee_share,
            Netpay:total.net_pay.toFixed(2),
            basic_salary:total.basic_pay.toFixed(2),
            philhealth:total.philhealth_cont.toFixed(2),
            pagibig_employee_share:total.pagibig_result,
          };
        });
    
        const totalLate = backendData.reduce((sum:number, row:PreparePayroll) => sum + parseFloat(row.LateCount || "0"), 0);
        const totalAbsent = backendData.reduce((sum:number, row:PreparePayroll) => sum + parseFloat(row.TotalAbsentHours || "0"), 0);
        const totalOvertime = backendData.reduce((sum:number, row:PreparePayroll) => sum + parseFloat(row.TotalOvertime || "0"), 0);
    
        SweetAlert.confirmationAlert(
          "Confirm Save",
          `Are you sure you want to archive payroll for "${selectedPayCode}"?`,
          () => {
            saveArchive(
              {
                paycode: selectedPayCode,
                totals: {
                  Total_Late: totalLate,
                  Total_Absent: totalAbsent,
                  Total_OverTimePay: totalOvertime,
                },
                computedData: backendData,
              },
              {
                onSuccess: () => {
                  SweetAlert.successAlert("Saved", "Payroll archived successfully.");
                },
                onError: (error: any) => {
                  if (error?.response?.status === 409) {
                    SweetAlert.warningAlert(
                      "Already Archived",
                      error.response.data?.message || "This payroll period has already been archived."
                    );
                  } else {
                    SweetAlert.errorAlert("Error", "Failed to save payroll.");
                  }
                },
              }
            );
          }
        );
      } catch (error) {
        console.error("Failed to fetch all payroll data:", error);
        SweetAlert.errorAlert("Error", "Failed to fetch full payroll data.");
      }
    };




    useEffect(() => {
      setCurrentPage(1);
    },[debouncedSearch]
    );


    const columns: Column[] = [
      { header: "Pay Cycle", accessor: "PayCode"},
      { header: "EmpCode", accessor: "EmpCodeId"},
      { header: "Basic Pay", accessor: "basic_salary" },
      { header: "Late", accessor: "LateCount" },
      { header: "Absent", accessor: "TotalAbsentHours" },
      { header: "Gross Pay", accessor: "GrossPay" },
      { header: "Overtime", accessor: "TotalOvertime" }, 
      { header: "Action",accessor:"action"}
    ];
  


        
    return(

      
        <div className={styles.main_container}>

            <div className={`Wrapper-wider ${styles.main_body}`}>

              <div className={styles.title_header}>
                    <div className={styles.header_col}>
                        <h1 className='fs-600 fw-bold txt-color-txt-clr-dark-neutral'>Payroll List</h1>
                        <p className='fs-400 fw-regular txt-color-txt-clr-light-neutral'>View overall attendance and performance.</p>
                    </div>

                    <div className={styles.header_col_1}>
                    <PayrollDropdown
                      groupedPayCodes={groupedPayCodes}
                      selected={selectedPayCode}
                      setSelected={(val) => {
                        setSelectedPayCode(val);
                        setCurrentPage(1);
                      }}
                    />

                  </div>

                
                   
              </div>



              <div className={styles.inner_container}>

              <div className={styles.searcButton}>
                <SearchButton searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchButton>
              </div>

              <div style={{ minHeight: "500px"}}>
                    <Table
                      data={tableData}
                      columns={columns}
                      withPagination
                      currentPage={currentPage}
                      totalPages={totalPages}
                      onPageChange={setCurrentPage}
                    />
                  </div>

  

                  <div className={styles.title_footer}>

                      <Button className='fs-400 fw-bold ' variant='general'onClick={handleSavePayroll} disabled={isPending}>
                        {isPending ? "Saving..." : "Save Payroll"}
                      </Button>

                      <h2 className='fs-4000 fw-bold txt-color-txt-clr-light-neutral'>
                          Payroll Date:{" "}
                          {selectedPayCode ? <span>{selectedPayCode}</span> : "Please select a date"}
                      </h2>

                  </div>
                 
              </div>


    

              <MainModal 
                isOpen={isOpen}
                modalSize={modalKey? modalConfigMap[modalKey]?.size : "large"}
                modalTitle={modalKey ? modalConfigMap[modalKey]?.title : ""}
                closeModal={closeModal}
                >
                {modalKey && modalType && getModalContent(modalKey,modalType,rowDataList,closeModal)}
              </MainModal>

                        




            </div>

        </div>





       
      
    );
}
















