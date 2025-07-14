"use client";
import React from 'react';
import payrollCompStyles from '@/public/css/NavComponentsCss/payrollComp.module.css';
import Button from "@/app/components/buttons";
import { usePathname } from 'next/navigation';
import { useRouter } from 'next/navigation';
import MainModal from "@/app/components/ModalJohn";
import { useModal } from '../hooks/customHooks/useModal';
import { ModalKey } from '@/app/types/types';
import { modalConfigMap, getModalContent } from '../lib/ModalRegistry';



export default function SubClientOnlyLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { isOpen, modalType, modalKey, rowDataList, openModal: openModal2, closeModal: closeModal2  } = useModal<ModalKey>();



  return (
    <div>
        <div className="SubNavContainer">
            <div className={`${payrollCompStyles.componentWrapper}`}>
                <div className={payrollCompStyles.payrollComp}>
                <h1 className={`fs-600 ${payrollCompStyles.title}`}>Payroll Management</h1>
                <p className={payrollCompStyles.description}>
                    Manage your payroll efficiently with our comprehensive tools.
                </p>
                <ul className={payrollCompStyles.menu}>
                    
                    <li className={`fs-400 fw-regular ${pathname == "/main-payroll" ? payrollCompStyles.activeMenu : ''}`} onClick={(e)=>
                        {
                            e.stopPropagation();
                            router.push("/main-payroll");
                        }
                    }>Generate Salary</li>
                    <li className={`fs-400 fw-regular ${pathname == "/main-payroll/generate-payslip" ? payrollCompStyles.activeMenu : ''}`} onClick={(e)=>{
                        e.stopPropagation();
                        router.push("/main-payroll/generate-payslip");
                    }}>Generate Payslip</li>
                    <li className={`fs-400 fw-regular ${pathname == "/main-payroll/archive-payroll" ? payrollCompStyles.activeMenu : ''}`} onClick={(e)=>{
                        e.stopPropagation();
                        router.push("/main-payroll/archive-payroll");
                    }}>Payroll Archive</li>
                </ul>
                </div>
                <div className={payrollCompStyles.importAtt}>
                    <Button variant="primary" onClick={() => openModal2('Add_Employee_Payroll_ModalKey','add')}>Add Employee Payroll</Button>
                </div>
            </div>
        </div>
        <main className="main-layout">
            {children}
        </main>






            <MainModal
            isOpen={isOpen}
            modalSize={modalKey ? modalConfigMap[modalKey]?.size : "medium"}
            modalTitle={modalKey ? modalConfigMap[modalKey]?.title : ""}
            closeModal={closeModal2}
            >
            {modalKey && modalType && getModalContent(modalKey, modalType, rowDataList, closeModal2)}
            </MainModal>
                      

    </div>
  );
}