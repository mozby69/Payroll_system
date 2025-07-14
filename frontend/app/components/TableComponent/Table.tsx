"use client"
import React, { useState, useMemo } from "react";

import TableHeader from "./TableHeader";
import TableBody from "./TableBody";
import TableFooter from "./TableFooter";
import TableSearch from "./TableSearch";
import TableFilter from "./TableFilter";
import RowsPerPageSelector from "./TableRowSelector";
import TableStyle from "@/public/css/tableComponent.module.css";


interface TableProps<T> {
  data: T[];
  columns: { key: keyof T; label: string }[];
  pagination: {
    currentPage: number;
    totalPages: number;
    rowsPerPage: number;
    totalEntries: number;
    onPageChange: (page: number) => void;
    onRowsPerPageChange: (rows: number) => void;
  };
  search?: {
    value: string;
    onChange: (val: string) => void;
  };
  filter?: {
    selected: string;
    filterOptions?: string[];
    onChange: (val: string) => void;
  };
  onView?: (row: T) => void;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const Table = <T,>({
  data,
  columns,
  pagination,
  search,
  filter,
  onEdit,
  onDelete,
  onView,
}: TableProps<T>) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterQuery, setFilterQuery] = useState("");

  const handleSearchChange = (value: string) => {
    setSearchQuery(value);
    search?.onChange?.(value);
  };

  const handleFilterChange = (value: string) => {
    setFilterQuery(value);
    filter?.onChange?.(value);
  };


  const getPaginationRange = (): (number | "...")[] => {
    const totalPageNumbersToShow = 7;
    const totalPages = pagination.totalPages;
    const currentPage = pagination.currentPage;
  
    if (totalPages <= totalPageNumbersToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
  
    const leftSiblingIndex = Math.max(currentPage - 1, 1);
    const rightSiblingIndex = Math.min(currentPage + 1, totalPages);
  
    const showLeftEllipsis = leftSiblingIndex > 2;
    const showRightEllipsis = rightSiblingIndex < totalPages - 1;
  
    const range: (number | "...")[] = [];
  
    if (!showLeftEllipsis && showRightEllipsis) {
      const leftItemsCount = 4;
      const leftRange = Array.from({ length: leftItemsCount }, (_, i) => i + 1);
      return [...leftRange, "...", totalPages];
    }
  
    if (showLeftEllipsis && !showRightEllipsis) {
      const rightItemsCount = 4;
      const rightRange = Array.from(
        { length: rightItemsCount },
        (_, i) => totalPages - rightItemsCount + i + 1
      );
      return [1, "...", ...rightRange];
    }
  
    if (showLeftEllipsis && showRightEllipsis) {
      const middleRange = Array.from(
        { length: 3 },
        (_, i) => currentPage - 1 + i
      );
      return [1, "...", ...middleRange, "...", totalPages];
    }
  
    return [];
  };

  
  return (
    <div className={TableStyle.table_main_content}>
      <div className={TableStyle.table_toolbar}>
        <div className={TableStyle.rows_selector}>
          <span className={TableStyle.text_spacing}>Show</span>
          <RowsPerPageSelector
            rowsPerPage={pagination.rowsPerPage}
            setRowsPerPage={pagination.onRowsPerPageChange}
            setCurrentPage={pagination.onPageChange}
          />
          <span className={TableStyle.text_spacing}>Entries</span>
        </div>
        <TableSearch searchQuery={searchQuery} setSearchQuery={handleSearchChange} />
        <TableFilter
          filterQuery={filterQuery}
          onChange={handleFilterChange}
          options={filter?.filterOptions ?? []}
        />
      </div>

      <div className={TableStyle.table_wrapper}>
        <table className={TableStyle.table}>
          <TableHeader columns={columns} requestSort={() => {}} sortConfig={null} onView={onView} />
          <TableBody columns={columns} displayedRows={data} onEdit={onEdit} onView={onView} onDelete={onDelete} />
        </table>
      </div>

      <TableFooter
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        setCurrentPage={pagination.onPageChange}
        totalEntries={pagination.totalEntries}
        rowsPerPage={pagination.rowsPerPage}
        getPaginationRange={getPaginationRange}
      />
    </div>
  );
};


export default Table;
