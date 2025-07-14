'use client';

import { useState } from 'react';
import Button from '@/app/components/buttons';
import py from '@/public/css/payslip.module.css';


const sampleData = Array.from({ length: 100 }, (_, i) => ({
  empcode: `EMB${(10001 + i).toString()}`,
  name: 'Kim Janrey Ramos',
}));

export function PayslipTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  const totalItems = sampleData.length;
  const totalPages = Math.ceil(totalItems / rowsPerPage);
  const startIndex = (currentPage - 1) * rowsPerPage;
  const currentRows = sampleData.slice(startIndex, startIndex + rowsPerPage);
  const goToPage = (page: number) => setCurrentPage(page);
  const handlePrev = () => setCurrentPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setCurrentPage((p) => Math.min(p + 1, totalPages));
  const [active, setActive] = useState(0);

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);

      if (currentPage > 6) pages.push('...');

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) pages.push(i);

      if (currentPage < totalPages - 3) pages.push('...');
      pages.push(totalPages);
    }

    return pages.map((page, i) =>
      typeof page === 'number' ? (
        <button
          key={i}
          onClick={() => goToPage(page)}
          style={{
            fontWeight: currentPage === page ? 'bold' : 'normal',
            padding: '4px 8px',
            borderRadius: '4px',
            backgroundColor: currentPage === page ? '#2f855a' : 'transparent',
            color: currentPage === page ? '#fff' : '#333',
            border: 'none',
            cursor: 'pointer',
            minWidth: '30px',
          }}
        >
          {page}
        </button>
      ) : (
        <span key={i} style={{ padding: '0 6px' }}>
          ...
        </span>
      )
    );
  };
const handleClick = (idx: number) => {    
  setActive(idx);
}
  return (
    <div>
      <table className={py.paylsip_table}>
        <thead>
          <tr>
            <th>Empcode</th>
            <th>Employee Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {currentRows.map((row, idx) => (
            <tr key={idx} className={py.table_row}>
              <td>{row.empcode}</td>
              <td>{row.name}</td>
              <td>
                <button type='button' onClick={()=>handleClick(idx)}  className={active==idx? py.button_action_active  : py.button_action}>
                   View Payslip
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination Summary & Controls */}
      <div
        style={{
          marginTop: '5px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          fontSize: '0.9rem',
        }}
      >
        <div className='fs-400 fw-regular txt-color-txt-clr-light-neutral'>
          Showing {startIndex + 1} -{' '}
          {Math.min(startIndex + rowsPerPage, totalItems)} of {totalItems}{' '}
          Employees
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
          <button disabled={currentPage === 1} onClick={handlePrev}>
            «
          </button>
          {renderPageNumbers()}
          <button disabled={currentPage === totalPages} onClick={handleNext}>
            »
          </button>
        </div>
      </div>
    </div>
  );
}
