"use client"
import React from "react";
import TableStyle from "@/public/css/tableComponent.module.css";

interface TableColumn<T> {
  key: keyof T;
  label: string;
  class?: string;
}

interface TableBodyProps<T> {
  columns: TableColumn<T>[],
  displayedRows: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  onView?: (row: T) => void;
}

function TableBody<T>({ columns, displayedRows, onEdit, onDelete, onView }: TableBodyProps<T>) {
  if (displayedRows.length === 0) {
    return (
      <tbody>
        <tr>
          <td colSpan={columns.length + ( onView ? 1 : 0) + ( onEdit ? 1 : 0) + ( onDelete ? 1 : 0)} className={TableStyle.tdEmpty}>
            No data available
          </td>
        </tr>
      </tbody>
    );
  }

  return (
    <tbody>
       {displayedRows.map((row, index) => (
      <tr key={index} className={TableStyle.table_row}>
        {columns.map((col) => (
          <td key={String(col.key)} className={TableStyle.tableCell}>
            {String(row[col.key])}
          </td>
        ))}
          <td className={TableStyle.actionCell}>
            {onView ? (
              <button onClick={() => onView?.(row)} className={TableStyle.btnView}>
                View Archive
              </button>
               ) : null}
            {onEdit ? (
              <button onClick={() => onView?.(row)} className={TableStyle.btnView}>
                View Archive
              </button>
            ) : null}
            {onDelete ? (
              <button onClick={() => onView?.(row)} className={TableStyle.btnView}>
                View Archive
              </button>
            ) : null}
          </td>
      </tr>
      ))}
    </tbody>
  );
}

export default TableBody;
