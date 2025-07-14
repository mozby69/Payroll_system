"use client";


import { PaginatedTable } from '@/app/components/PaginatedTable';
import SearchButton from '@/app/components/SearchButton';
import Button from '@/app/components/buttons';
import { useFetchBranches } from '@/app/hooks/useGeneralHook';
import { useGetFilterEmployees } from '@/app/hooks/useMainPayroll';
import { Employees } from '@/app/types/mainpayroll';
import py from '@/public/css/payslip.module.css';
import { Settings, Tune } from '@mui/icons-material';
import { useState } from 'react';

export default function EmployeeList() { 
  const [branchCode, setBranchCode] = useState("");
  const [active, setActive] = useState(0);
  const [page, setPage] = useState(1)
  const [perPage, setPerPage] = useState(7);
  const [search, setSearch] = useState("");
  const { data, isLoading } = useGetFilterEmployees(branchCode, page, perPage, search);
  const {data: branches} = useFetchBranches();
  console.log("Branches:", branches);

  const handleClick = (row: Employees, idx: number) => {    
    setActive(idx);
    console.log("Selected Employee:", row);
  }
    return(
        <div className={py.py_emplist}>
        <div className={py.flex}>
            <h1 className="fs-600 fw-bold txt-color-txt-clr-dark-neutral">Employee List</h1>
            <p className='fs-400 fw-regular txt-color-txt-clr-light-neutral'>Overall attendance and performance.</p>
            <div className={py.button_list}>
                <div className={py.search}>  
                  <SearchButton searchTerm={search} setSearchTerm={setSearch} />
                </div> 
                <div className={py.filter}> 
                 <Button variant="outline">
                     <Tune /> 
                     Filter 
                 </Button>
                    {/* <div className={py.filter_list}>
                        <h1 className='fs-500 fw-regular txt-color-txt-clr-light-neutral text-center'>Filter Categories</h1>
                        <div>
                          <div className={py.radio}>
                              <input type="radio" name="" id="" />
                              <label htmlFor="">Branches</label>
                          </div>
                          {branches && (
                          <>
                            <input type="text" list="branchList" placeholder="Select Branch Code" />
                            <datalist id="branchList">
                              {branches
                                .filter(branch => branch.BranchCode)
                                .map((branch, index) => (
                                  <option key={branch.BranchCode || index} value={branch.BranchCode}>
                                    {branch.BranchCode}
                                  </option>
                                ))}
                            </datalist>
                          </>
                        )}
                        </div>

                    </div> */}
                </div>
                <div className={py.generate}>
                  <Button variant="general">Generate Payslip</Button>
                </div> 
            </div>
          <PaginatedTable<Employees>
            data={Array.isArray(data?.data) ? data.data : []} // ✅ use data.data
            columns={[
              { header: 'Empcode', accessor: 'EmpCode' },
              { header: 'Employee Name',
                cell: (row) => `${row.Lastname ?? ''} ${row.Firstname ?? ''} `.trim(),
                },
              {
                header: 'Action',
                cell: (row, index) => (
                  <button  onClick={()=>handleClick(row, index)}  className={active==index? py.button_action_active  : py.button_action}>
                    View Payslip
                  </button>
                )
              },
            ]}
            total={data?.total ?? 0}
            currentPage={data?.currentPage ?? 1}
            perPage={data?.perPage ?? 10}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
    </div>

    );
}