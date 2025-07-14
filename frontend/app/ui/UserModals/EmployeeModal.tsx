
import React, {useEffect, useState} from "react";
import empmodalstyle from "@/public/css/ComponentCss/EmpModal.module.css" 
import EmployeeProfile from "../EmpModalComponents/EmployeeProfile";
import SalaryInfo from "../EmpModalComponents/SalaryInfo";
import EmployeeAre from "../EmpModalComponents/EmployeeAre";
import { employeesDetails } from "@/app/types/types";

export default function EmployeeModal({ isOpen,employee }: {isOpen: boolean,employee:employeesDetails | null}){

    const [tabName, setTabName] = useState('');


    useEffect(()=>{
        if (isOpen){
            setTabName("Employee Profile");
        }
    },[isOpen]);

    return(
        <div className={`Wrapper-wide `}>
            <div className={empmodalstyle.emp_modal_main}>
                <ul className={empmodalstyle.sidetabs}>
                    <li
                        className={`fs-400 fw-regular txt-color-txt-clr-light-neutral ${tabName == "Employee Profile" ? empmodalstyle.activeTab : ''}`}
                        onClick={() => setTabName("Employee Profile")}
                    >
                        Employee Profile
                    </li>
                    <li className={`fs-400 fw-regular txt-color-txt-clr-light-neutral ${tabName == "Salary Information" ? empmodalstyle.activeTab : ''}`} onClick={(e)=>
                        setTabName("Salary Information")
                    }>
                        Salary Information
                    </li>
                    <li className={`fs-400 fw-regular txt-color-txt-clr-light-neutral ${tabName == "AR/E" ? empmodalstyle.activeTab : ''}`} onClick={(e)=>
                        setTabName("AR/E")
                    }>
                        AR/E
                    </li>
                </ul>
                <div className={`Wrapper-wider ${empmodalstyle.main_body}`}>
                    <h1 className="fs-400 fw-bold txt-color-txt-clr-dark-neutral">{tabName}</h1>

                    {tabName === "Employee Profile" &&(
                        <EmployeeProfile employee={employee}></EmployeeProfile>
                    )}

                    {tabName === "Salary Information" &&(
                        <SalaryInfo></SalaryInfo>
                    )}
                    {tabName === "AR/E" &&(
                        <EmployeeAre></EmployeeAre>
                    )}


                </div>
            </div>
        </div>
    )
}