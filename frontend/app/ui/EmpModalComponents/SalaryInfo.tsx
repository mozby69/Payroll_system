import React,{useState} from "react";
import SalaryStyle from "@/public/css/EmpModalComponents/SalaryInfo.module.css"
import GeneralStyle from "@/public/css/EmpModalComponents/GeneralModal.module.css"
import Button from "@/app/components/buttons";


export default function SalaryInfo(){
    const [inpuVal, SetInputVal] = useState('');


    return(
        <div className={GeneralStyle.content_body}>

            <div className={GeneralStyle.body_row_1}>
                <div className={SalaryStyle.row_1_col_1}>
                    <div className={`${SalaryStyle.SalStructure} ${GeneralStyle.input_col}`}>
                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Salary Structure Alloted</label>
                        <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"Software Engineer"} onChange={(e)=>{
                            SetInputVal(e.target.value)
                        }}/>
                    </div>
                    <div className={`${SalaryStyle.Ctc}  ${GeneralStyle.input_col}`}>
                        <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">CTC</label>
                        <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"20,000.00"} onChange={(e)=>{
                            SetInputVal(e.target.value)
                        }}/>
                    </div>
                </div>
                <div className={SalaryStyle.row_1_col_2}>
                         <Button variant="modaledit" className="fs-300 fw-regular">Edit</Button>
                </div>
            </div>

            <div className={GeneralStyle.body_row_2}>
                <h5 className="fs-300 fw-bold txt-color-txt-clr-light-neutral">CTC Breakup Information</h5>
                <div className={GeneralStyle.row_2_body}>
                    <div className={SalaryStyle.row_2_col_1}>
                        <div className={`${SalaryStyle.BasicSalary}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Basic Salary</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"16,000.00"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${SalaryStyle.BonusSalary}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Bonus Salary</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"0.00"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${SalaryStyle.Allowance}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Allowance</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"4,000.00"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${SalaryStyle.Eshare}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">E-share Deductions</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"1,000.00"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        
                    </div>
                    <div className={SalaryStyle.row_2_col_2}>
                        <Button variant="modaledit" className="fs-300 fw-regular">Edit</Button>
                    </div>
                </div>
            </div>

            <div className={SalaryStyle.body_row_3}>
                <div className={`${SalaryStyle.NetPay}  ${GeneralStyle.input_col}`}>
                       <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Net Salary Pay</label>
                       <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"19,000.00"} onChange={(e)=>{
                           SetInputVal(e.target.value)
                       }}/>
                </div>
                <div className={SalaryStyle.row_3_col_2}>
                     <Button variant="modaledit" className="fs-300 fw-regular">Edit</Button>
                </div>
            </div>

        </div>
    );
}