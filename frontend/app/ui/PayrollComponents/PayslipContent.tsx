import Button from '@/app/components/buttons';
import py from '@/public/css/payslip.module.css';
import { Print } from '@mui/icons-material';


export default function PayslipContent1() {
return(
    <div className={py.py_payslip_content}>
    <h1 className="fs-500 fw-bold  txt-color-txt-clr-light-neutral text-center" >EMB Capital Lending Corp.</h1> 
    <h1 className="fs-400 fw-regular txt-color-txt-clr-light-neutral text-center">**PAYSLIP**</h1> 
    <div className={py.py_grid}>
         <div className="p-05 pl-1 fs-400 fw-regular txt-color-txt-clr-light-neutral">
              Employee Code : EMB10427
         </div>
         <div className="p-05 pl-1 fs-400 fw-regular txt-color-txt-clr-light-neutral">
           Fullname : Christian Lloyd Magtolis
         </div>
         <div className="p-05 pl-1 fs-400 fw-regular txt-color-txt-clr-light-neutral">
           Payroll Period : April-16-30-2025 
         </div>
         <div className="p-05 pl-1 fs-400 fw-regular txt-color-txt-clr-light-neutral">
           4
         </div>
         <div className="p-05 pl-1 fs-400 fw-regular txt-color-txt-clr-light-neutral">
           Basic Pay : 9,230
         </div>
         <div className="p-05 pl-1 fs-400 fw-regular txt-color-txt-clr-light-neutral">
           Overtime Pay : 1,023
         </div>
         <div className={ `${py.py_grid_content} fs-400 fw-regular txt-color-txt-clr-light-neutral`}>
             <div className='p-05'>
               (Less) Late : 0
             </div>
             <div className='p-05'>
               Absence : 600
             </div>
         </div>
         <div className="p-05 pl-1 fs-400 fw-regular txt-color-txt-clr-light-neutral">
           Gross Pay : 8,000
         </div>
    </div>
    <h1 className='text-center fs-400 fw-regular txt-color-txt-clr-light-neutral'>DEDUCTIONS</h1>
    <div className={py.relative}>
       <div className={py.py_grid1}>
           <div className={` ${py.border_left} p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral `}>SSS Cont: 720.0</div>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral">W/Tax: 0.00</div>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral">PAG-IBIG: 0.00</div>
           <div className={` ${py.border_right} p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral `}>AR/E: 0.00</div>
           <div className={` ${py.border_left} p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral `}>FCH Ln.: 0.00</div>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral">Phl. Hlt: 400.00</div>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral">P. Sal. Ln: 0.00</div>
           <div className={` ${py.border_right} p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral `}>OTHER LOANS</div>
       </div>
         <div className={py.absolute}>
             <h1 className='fs-300 fw-regular txt-color-txt-clr-light-neutral'>SSS</h1>
             <h1 className='fs-300 fw-regular txt-color-txt-clr-light-neutral'>LOAN</h1>
         </div>
    </div> 
       <div className={py.py_grid2}>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral">Salary: 0.00</div>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral">Calamity: 0.00</div>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral">Housing: 0.00</div>
           <div className="p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral"></div>
       </div>
       <div className={py.py_grid3}>
             <h1 className='p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral'>TOTAL DEDUCTIONS : 1,120</h1>
             <h1 className='p-05 fs-400 fw-regular txt-color-txt-clr-light-neutral'>NET PAYABLE : 7,023</h1>
       </div>
       <div className='self-end pt-05'>
            <Button variant="general" className={py.py_button}>
                 <Print  />
                 Print
            </Button>
       </div>
 </div>
);

}