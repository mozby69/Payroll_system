"use client"
import React from "react";
import TableStyle from "@/public/css/tableComponent.module.css";

interface TableHeaderProps<T> {
  columns: { key: keyof T; label: string }[];
  sortConfig: { key: keyof T; direction: "asc" | "desc" } | null;
  requestSort: (key: keyof T) => void;
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

function TableHeader<T>({ columns, sortConfig, requestSort, onView, onEdit, onDelete }: TableHeaderProps<T>) {
  const getSortIndicator = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) return "";
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const getAriaSort = (key: keyof T) => {
    if (!sortConfig || sortConfig.key !== key) return "none";
    return sortConfig.direction === "asc" ? "ascending" : "descending";
  };

  return (
     <thead >
      <tr>
        {columns.map((col) => (
          <th
            key={String(col.key)}
            onClick={() => requestSort(col.key)}
            className={TableStyle.tableHeaderCell}
            aria-sort={getAriaSort(col.key)}
          >
            {col.label} {getSortIndicator(col.key)}
          </th>
        ))}
        {onView && <th className={TableStyle.tableHeaderCell}>Actions</th>}
        {onEdit && <th className={TableStyle.tableHeaderCell}>Action</th>}
        {onDelete && <th className={TableStyle.tableHeaderCell}>Action</th>}
      </tr>
    </thead>
  );
}

export default TableHeader;
