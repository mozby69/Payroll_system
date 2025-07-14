import { FC, useEffect, useState } from "react";
import { PreparePayroll } from "@/app/types/types";
import styles from '@/public/css/prepare_payroll.module.css'
import { useAvailableEmployees,useSaveEmployeePayroll } from "@/app/hooks/usePreparePayroll";
import Swal from "sweetalert2";
import SweetAlert from "@/app/components/Swal";

const Add_Employee_Payroll:FC<{closeModal:() => void}> = ({closeModal}) => {
const { data: employees, isLoading, isError } = useAvailableEmployees();
const { mutate: addPayroll, isPending } = useSaveEmployeePayroll();
const [formData, setFormData] = useState({EmpCodeId: "",basic_salary: "",pagibig_employee_share:"",
pagibig_employer_share:"",sss_employee_share:"",sss_employer_share:""});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData(prev => ({...prev,[e.target.name]: e.target.value}));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.EmpCodeId || !formData.basic_salary) {
      alert("Please fill in all fields");
      return;
    }

    addPayroll(
      {
        EmpCodeId: formData.EmpCodeId,
        basic_salary: parseFloat(formData.basic_salary),
        pagibig_employee_share:parseFloat(formData.pagibig_employee_share),
        pagibig_employer_share:parseFloat(formData.pagibig_employer_share),
        sss_employee_share:parseFloat(formData.sss_employee_share),
        sss_employer_share:parseFloat(formData.sss_employer_share),
      },
      {
        onSuccess: () => {
            SweetAlert.successAlert("succes","Saved Successfully!");
          closeModal();
        },
        onError: () => {
            SweetAlert.errorAlert("Error", "Something went wrong!");
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className={styles.forms_edit}>
        <div>
          <label htmlFor="EmpCodeId">EmpCode</label>
          <select name="EmpCodeId" value={formData.EmpCodeId} onChange={handleChange} required>
            <option value="" disabled>-Select EmpCode-</option>
            {isLoading && <option>Loading...</option>}
            {isError && <option>Error loading employees</option>}
            {employees?.map(emp => (
              <option key={emp.EmpCode} value={emp.EmpCode}>
                {emp.EmpCode}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="basic_salary">Basic Salary</label>
          <input name="basic_salary" id="basic_salary" type="number" value={formData.basic_salary} onChange={handleChange} required/>
        </div>

        <div>
          <label htmlFor="pagibig_employee_share">Pagibig Employee Share</label>
          <input name="pagibig_employee_share" id="pagibig_employee_share" type="number" value={formData.pagibig_employee_share} onChange={handleChange} required/>
        </div>

        <div>
          <label htmlFor="pagibig_employer_share">Pagibig Employer Share</label>
          <input name="pagibig_employer_share" id="pagibig_employer_share" type="number" value={formData.pagibig_employer_share} onChange={handleChange} required/>
        </div>

    

      </div>

      <div className={styles.footer_container}>
        <div className={styles.sub_footer_container}>
          <button type="submit" className={styles.buttonSave} disabled={isPending}>
            {isPending ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={closeModal} className={styles.buttonClose}>Close</button>
        </div>
      </div>
    </form>
  );
};

export default Add_Employee_Payroll;

