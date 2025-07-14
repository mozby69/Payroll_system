
import Table from "@/app/components/Table";
import styles from "@/public/css/payroll_archive.module.css";
import { Column } from '@/app/types/types';
import FilterListAltIcon from '@mui/icons-material/FilterListAlt';


export default function ArchivePayroll(){

      const columns: Column[] = [
        { header: "PayDate", accessor: "PayDate"},
        { header: "EmpCodeId", accessor: "EmpCodeId"},
        { header: "TotalHoursWorked", accessor: "TotalHoursWorked" },
        { header: "LateCount", accessor: "LateCount" },
        { header: "TotalAbsentHours", accessor: "TotalAbsentHours" },
        { header: "TotalUndertime", accessor: "TotalUndertime" },
        { header: "TotalOvertime", accessor: "TotalOvertime" }, 
        { header: "Action",accessor:"action"}
      ];
    

    const emptyData = [{PayDate:"-",EmpCodeId:"-",TotalHoursWorked:"-",LateCount:"-",TotalAbsentHours:"-",TotalUndertime:"-",TotalOvertime:"-"}];

    return (

        <div className={styles.main_container}>
            
            <div className={styles.header}>
                <div><h5 className={styles.title_header}>ARCHIVE PAYROLL</h5></div>
                <div>
                <button className={styles.filter_button}>
                <FilterListAltIcon className={styles.icon} />
                <h6>Filter</h6>
                </button>

                </div>
            </div>
            


            <div className={styles.first_section}>

                <Table data={emptyData} columns={columns}></Table>
            </div>

        </div>
  
      );
}