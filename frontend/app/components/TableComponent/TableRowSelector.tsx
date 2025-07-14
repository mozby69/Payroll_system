import React, { useState } from "react";
import TableStyle from "@/public/css/tableComponent.module.css";

interface RowsPerPageSelectorProps {
  rowsPerPage: number;
  setRowsPerPage: (value: number) => void;
  setCurrentPage: (page: number) => void;
  options?: number[];
}

const RowsPerPageSelector: React.FC<RowsPerPageSelectorProps> = ({
  rowsPerPage,
  setRowsPerPage,
  setCurrentPage,
  options = [5, 10, 20, 50, 100],
}) => {
  const [ numberRows, setNumberRows] = useState(rowsPerPage);
  return (
      <select
        className={TableStyle.selector}
        value={numberRows}
        onChange={(e) => {
          const newRowsPerPage = Number(e.target.value);
          setNumberRows(newRowsPerPage); 
          setRowsPerPage(newRowsPerPage);
          setCurrentPage(1);
        }}
      >
        {options.map((num) => (
          <option key={num} value={num}>
            {num}
          </option>
        ))}
      </select>
  );
};

export default RowsPerPageSelector;
