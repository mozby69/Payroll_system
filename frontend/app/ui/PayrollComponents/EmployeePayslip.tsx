import py from '@/public/css/payslip.module.css';
import PayslipContent1 from './PayslipContent';
import PayslipList from './PayslipList';
export default function EmployeePayslip() { 

    return (
    <div className={py.py_payslip}>
            <PayslipContent1 />
            <PayslipList />
     </div>
    );
}