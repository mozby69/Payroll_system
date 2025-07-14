"use client";
import Table from "@/app/components/Table";
import { Column } from "@/app/types/types";
import styles from "@/public/css/master_list.module.css";
import { useEmployees } from "@/app/hooks/useEmployee";
import dayjs from "dayjs";
import { useState,useEffect } from "react";
import SearchButton from "@/app/components/SearchButton";
import { useDebounce } from "use-debounce";
import Image from "next/image";
import ResponsiveImage from "../components/ResponsiveImg";
import Modal from "../components/Modal";
import EmployeeModal from "../ui/UserModals/EmployeeModal";
import { useDisplayAllEmployee } from "@/app/hooks/useEmployee";
import { employeesDetails } from "../types/types";

function EmployeeMasterlist() {
    const [currentPage, setCurrentPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch] = useDebounce(searchTerm, 450);
    const [entriesLimit, setEntriesLimit] = useState(20);
    const [employeeModal, setEmployeeModal] = useState(false);
    const { data:allemployees } = useDisplayAllEmployee(debouncedSearch, entriesLimit, currentPage);
    const [selectedEmployee, setSelectedEmployee] = useState<employeesDetails | null>(null);



    useEffect(() => {
      setCurrentPage(1);
    }, [debouncedSearch]);
    



  const handleCloseModal = () => {
    setEmployeeModal(false);  
  }



 const formatDate = (dateStr: string): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "2-digit",
  });
};

  

  return (

    <div className={styles.main_container}>
        <div className={`Wrapper-wider ${styles.main_body}`}>

          <div className={styles.list_header}>

            <div className={`fs-500 fw-bold txt-color-txt-clr-dark-neutral ${styles.main_title}`}>
              <ResponsiveImage src="/images/EmployeesIcon.svg" alt="emp_icon" width={4} height={3.5}/>
              <div>
                Total Employees
                <p className="fs-600 fw-bold">500</p>
              </div>
            </div>
            <div className={styles.header_filter}>
              <SearchButton searchTerm={searchTerm} setSearchTerm={setSearchTerm}></SearchButton>

            

              <div>
                <select
                  name="count"
                  id="emp_count"
                  className="fs-400 fw-regular txt-color-txt-clr-light-neutral"
                  value={entriesLimit}
                  onChange={(e) => {
                    setEntriesLimit(Number(e.target.value));
                    setCurrentPage(1); 
                  }}>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
                <label htmlFor="emp_count" className="fs-400 txt-color-txt-clr-light-neutral">
                  Show Entries
                </label>
              </div>

          
            </div>
            
          </div>

          <div className={styles.table_container}>
          

          </div>

        </div>

        <div className={`Wrapper-wider ${styles.card_list}`}>
              {allemployees?.map(emp => (
              <div key={emp.EmpCode} className={styles.emp_card}>
                <div className={styles.card_header}>
                  <p className="fs-200 fw-bold">Regular</p>
                  <div onClick={(e)=>{
                    setSelectedEmployee(emp);
                    setEmployeeModal(true)
                  }}>
                    <ResponsiveImage src="/images/card_menu.svg" alt="Payroll" />
                  </div>
                 
                </div>
                <div className={styles.card_body}>
                  <div className={styles.card_profile}>
                      <ResponsiveImage src="/images/UserProfile.svg" alt="Payroll" width={4} height={4} />
                  </div>
                  <h1 className="fs-500 fw-bold txt-color-txt-clr-dark-neutral">{`${emp.Firstname} ${emp.Middlename ? emp.Middlename + ' ' : ''}${emp.Lastname}`}</h1>
                  <h5 className="fs-400 fw-regular txt-color-txt-clr-light-neutral">{emp.Position}</h5>
                </div>
                <div className={styles.card_footer}>
                  <p className="fs-300 fw-regular txt-color-txt-clr-light-neutral">Employment Date :</p>
                  <p className="fs-300 fw-regular txt-color-txt-clr-light-neutral">{formatDate(emp.EmployementDate)}</p>
                </div>
              </div>
            ))}
        </div>


        <Modal isOpen={employeeModal} onClose={handleCloseModal} title="Employee Details" size="xlarge">
                  <EmployeeModal isOpen={employeeModal} employee={selectedEmployee}/>
        </Modal>
      
    </div>
 
  );
}

export default EmployeeMasterlist;
