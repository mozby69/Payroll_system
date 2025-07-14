import React from "react";
import { TableProps } from "../types/types";
import styles from "@/public/css/table.module.css";
import Pagination from "./Pagination";

const Table: React.FC<TableProps> = ({columns,data,withPagination = false,currentPage = 1,totalPages = 1,onPageChange}) => {
  return (
    <div className={styles.main_container}>
      <table className={styles.table_container}>
        <thead>
          <tr className={styles.header_table}>
            {columns.map((col, index) => (
              <th key={index}>{col.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{row[col.accessor]}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {withPagination && onPageChange && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Table;
