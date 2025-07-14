import { ReactNode } from "react";
import dynamic from 'next/dynamic';

import { PreparePayroll, ModalKey} from "@/app/types/types";
import { ModalDataMap } from "@/app/hooks/customHooks/useModal";
import Add_Employee_Payroll from "@/app/ui/PrepareModalComponents/addEmployeePR";


const PreparePayrollViewModal = dynamic(() => import("@/app/ui/PrepareModalComponents/ModalContents"), {
  loading: () => <div style={{ padding:'6px', textAlign:'center'}}>Loading modal...</div>,
  ssr: false,
});


export const modalConfigMap = {
    PreparePayrollView_ModalKey: {
      key: "key_PreparePayrollView",
      title: "View Details",
      size: "xlarge",
      dataType: {} as PreparePayroll,
    },
    Add_Employee_Payroll_ModalKey: {
      key: "key_Add_Employee_Payroll",
      title: "Add Employee Payroll",
      size: "xlarge",
      dataType: {} as PreparePayroll,
    },

} as const;

export const getModalContent = <k extends ModalKey>(modalKey: k,modalType: "add" | "edit" | "view",rowDataList: ModalDataMap[k] | null,closeModal: () => void): ReactNode => {
  switch (modalKey) {
    case "PreparePayrollView_ModalKey":
      return (
        <PreparePayrollViewModal
          rowData={rowDataList as PreparePayroll}
          isEditMode={modalType === "view"}
          closeModal={closeModal}

        />
      );

      case "Add_Employee_Payroll_ModalKey":
        return (
          <Add_Employee_Payroll
          closeModal={closeModal}
          />
        );
    default:
      return null;
  }
};
