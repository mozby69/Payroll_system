import { FC, useEffect, useState } from "react";
import { PreparePayroll } from "@/app/types/types";
import styles from '@/public/css/prepare_payroll.module.css';

 const PreparePayrollViewModal:FC<{rowData: PreparePayroll, isEditMode: boolean, closeModal: () => void}> = ({rowData, isEditMode, closeModal}) => {
    const [payCode,setPayCode] = useState<string>('');
    const [basicSalary,setbasicSalary] = useState<string>('');
    const [empCodeId,setempCodeId] = useState<string>('');
    const [LateCount,setLateCount] = useState<string>('');
    const [TotalAbsentHours,setTotalAbsentHours] = useState<string>('');
    const [TotalOvertime,setTotalOvertime] = useState<string>('');
    const [GrossPay,setGrossPay] = useState<number>(0);
    const [sss_employee_share,setSSS_employee_share] = useState<number>(0);
    const [Netpay,setNetPay] = useState<string>('');
    const [pagibig_employee_share, setPagibig_employee_share] = useState<number>(0);
    const [philhealth, setPhilhealth] = useState<string>('');

    useEffect( () => { 
        setPayCode(rowData.PayCode);
        setbasicSalary(rowData.basic_salary);
        setempCodeId(rowData.EmpCodeId);
        setLateCount(rowData.LateCount);
        setTotalAbsentHours(rowData.TotalAbsentHours);
        setTotalOvertime(rowData.TotalOvertime);
        setGrossPay(rowData.GrossPay);
        setSSS_employee_share(rowData.sss_employee_share);
        setNetPay(rowData.Netpay);
        setPagibig_employee_share(rowData.pagibig_employee_share);
        setPhilhealth(rowData.philhealth);
    },[rowData]);
  
    return (
        <div>
             
             <div>
                  <form id="edit-preparePayroll-form" className={styles.forms_edit}>

                  <div>
                    <label htmlFor="PayCode">Pay Date</label>
                    <input name="PayCode" id="PayCode" type="text" value={payCode ?? ""} readOnly/>
                  </div>

                 <div>
                    <label htmlFor="EmpCodeId">Emp Code</label>
                    <input name="EmpCodeId" id="EmpCodeId" type="text" value={empCodeId ?? ""} readOnly/>
                  </div> 

                   <div>
                    <label htmlFor="basic_salary">Basic Pay</label>
                    <input name="basic_salary" id="basic_salary" type="number" value={basicSalary ?? ""} readOnly/>
                  </div>

                  <div>
                    <label htmlFor="LateCount">Late</label>
                    <input name="LateCount" id="LateCount" type="number" value={LateCount ?? ""} readOnly/>
                  </div>

                  <div>
                    <label htmlFor="TotalAbsentHours">Absent</label>
                    <input name="TotalAbsentHours" id="TotalAbsentHours" type="number"value={TotalAbsentHours ?? ""} readOnly/>
                  </div>

                  <div>
                    <label htmlFor="OvertimeAtt">Overtime</label>
                    <input name="OvertimeAtt" id="OvertimeAtt" type="text" value={TotalOvertime ?? ""} readOnly/>
                  </div> 

                  
                  <div>
                    <label htmlFor="GrossPay">Gross Pay</label>
                    <input name="GrossPay" id="GrossPay" type="text" value={GrossPay ?? ""} readOnly/>
                  </div> 

                  <div>
                    <label htmlFor="sss">SSS Cont.</label>
                    <input name="sss" id="sss" type="text" value={sss_employee_share ?? ""} readOnly/>
                  </div> 

                  <div>
                    <label htmlFor="philhealth">Philhealth Cont.</label>
                    <input name="philhealth" id="philhealth" type="text" value={philhealth ?? ""} readOnly/>
                  </div> 
            
                  <div>
                    <label htmlFor="pagibig">Pagibig Cont.</label>
                    <input name="pagibig" id="pagibig" type="text" value={pagibig_employee_share ?? ""} readOnly/>
                  </div> 

                  <div>
                    <label htmlFor="sss">Net Pay</label>
                    <input name="sss" id="sss" type="text" value={Netpay ?? ""} readOnly/>
                  </div> 


                  </form>
              
              </div>
        </div>
    );
}

export default PreparePayrollViewModal;

