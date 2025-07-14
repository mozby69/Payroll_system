import React, { useState } from "react";
import EmpProfileStyle from "@/public/css/EmpModalComponents/EmpProfile.module.css"
import GeneralStyle from "@/public/css/EmpModalComponents/GeneralModal.module.css"
import ResponsiveImage from "@/app/components/ResponsiveImg";
import { employeesDetails } from "@/app/types/types";



export default function EmployeeProfile({employee}:{employee:employeesDetails | null}){
    const [InputVal, SetInputVal] = useState('');

    if (!employee) return <div>Loading...</div>;

    return(
        <div className={GeneralStyle.content_body}>

            <div className={GeneralStyle.body_row_1}>
                    <div className={EmpProfileStyle.row_col_1}>
                            <ResponsiveImage src="/images/UserProfile.svg" alt="Payroll" width={2} height={2} />
                        <div className={EmpProfileStyle.prof_content}>
                            <h1 className="fs-400 fw-bold txt-color-txt-clr-dark-neutral">{`${employee.Firstname} ${employee.Middlename} ${employee.Lastname}`}</h1>
                            <p className="fs-300 fw-regular txt-color-txt-clr-light-neutral">{employee.Position || 'N/A'}</p>
                            <p className="fs-300 fw-regular txt-color-txt-clr-light-neutral">{employee.Department || 'N/A'}</p>
                        </div>
                    </div>
                   
            </div>


            <div className={GeneralStyle.body_row_2}>
                <h5 className="fs-300 fw-bold txt-color-txt-clr-light-neutral">Personal Informations</h5>
                <div className={GeneralStyle.row_2_body}>
                    <div className={EmpProfileStyle.row_2_col_1}>
                        <div className={`${EmpProfileStyle.Firstname}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Firstname</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={employee.Firstname} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Middlename}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Middlename</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={employee.Middlename} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Lastname}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Lastname</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={employee.Lastname} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Department}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Department</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={employee.Department || 'N/A'} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Branch}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Branch</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={employee.BranchCodeId} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Address}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Address</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={employee.Address || 'N/A'} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                    </div>
                  
                </div>
            </div>

            <div className={GeneralStyle.body_row_3}>
                <h5 className="fs-300 fw-bold txt-color-txt-clr-light-neutral">Identifications</h5>
                 <div className={GeneralStyle.row_3_body}>
                    <div className={EmpProfileStyle.row_3_col_1}>
                        <div className={`${EmpProfileStyle.Empcode}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">EmpCode</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={employee.EmpCode} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Paycode}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">PayrollCode</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"PAY1397"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.SSS}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">SSS Identification</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"096463924752865"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Phlhlt}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Phl. Hlt Identification</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"096463924752865"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Tin}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Tin Identification</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"096463924752865"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                        <div className={`${EmpProfileStyle.Pagibig}  ${GeneralStyle.input_col}`}>
                            <label htmlFor="" className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Pag-Ibig Identification</label>
                            <input className={`fs-400 fw-regular txt-color-txt-clr-dark-neutral ${GeneralStyle.input_style}`} type="text" value={"096463924752865"} onChange={(e)=>{
                                SetInputVal(e.target.value)
                            }}/>
                        </div>
                    </div>
                   
                </div>
            </div>
        </div>
    )
}