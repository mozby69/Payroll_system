'use client';
import styles from '@/public/css/payslip.module.css';
import EmployeeList from '@/app/ui/PayrollComponents/EmployeeList';
import EmployeePayslip from '@/app/ui/PayrollComponents/EmployeePayslip';


export default function PayrollComp() {
  return (
    <div className={`${styles.main_container} ${styles.payslip_container}`}>
        <EmployeeList />
        <EmployeePayslip />
    </div> 
  );
}