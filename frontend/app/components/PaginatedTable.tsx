'use client'

import { useState } from 'react'
import styles from '@/public/css/payslip.module.css'

interface Column<T> {
  header: string
  accessor?: keyof T
  cell?: (row: T, index: number) => React.ReactNode
}

interface PaginatedTableProps<T> {
    data: T[];
    columns: Column<T>[];
    total: number;
    currentPage: number;
    perPage: number;
    onPageChange: (page: number) => void;
  }
  
  
export function PaginatedTable<T>({
    data = [],
    columns,
    total,
    currentPage,
    perPage,
  onPageChange,
}: PaginatedTableProps<T>) {
    const totalPages = Math.ceil(total / perPage)

    const renderPageNumbers = () => {
      const pages: (number | string)[] = []
      if (totalPages <= 7) {
        for (let i = 1; i <= totalPages; i++) pages.push(i)
      } else {
        pages.push(1)
        if (currentPage > 3) pages.push('...')
        const start = Math.max(2, currentPage - 1)
        const end = Math.min(totalPages - 1, currentPage + 1)
        for (let i = start; i <= end; i++) pages.push(i)
        if (currentPage < totalPages - 2) pages.push('...')
        pages.push(totalPages)
      }
  
      return pages.map((page, i) =>
        typeof page === 'number' ? (
          <button
            key={i}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? styles.table_button_action_active : styles.table_button_action}
          >
            {page}
          </button>
        ) : (
          <span key={i} style={{ padding: '0 6px' }}>...</span>
        )
      )
    }
  
   
  return (
    <div>
    <table className={styles.paylsip_table}>
      <thead>
        <tr>
          {columns.map((col, i) => (
            <th key={i}>{col.header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex} className={styles.table_row}>
            {columns.map((col, colIndex) => (
              <td key={colIndex}>
                {col.cell ? col.cell(row, rowIndex) : String(row[col.accessor!] ?? '')}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>

    <div style={{ marginTop: '5px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.9rem' }}>
      <div className='fs-400 fw-regular txt-color-txt-clr-light-neutral'>
        Showing page {currentPage} of {totalPages} ({total} total rows)
      </div>

      <div style={{ display: 'flex', gap: '6px' }}>
        <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)} className={styles.tableBtn}>«</button>
        {renderPageNumbers()}
        <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)} className={styles.tableBtn}>»</button>
      </div>
    </div>
  </div>
  )
}
