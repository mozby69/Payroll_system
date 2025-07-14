import React from "react";
import TableStyle from "@/public/css/tableComponent.module.css";

interface TableFilterProps {
  filterQuery: string;
  onChange: (value: string) => void;
  label?: string;
  options: string[];
}

const TableFilter: React.FC<TableFilterProps> = ({
  filterQuery,
  onChange,
  options,
}) => {

  return (
    <div className={TableStyle.filterWrapper}>
     <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={TableStyle.filterIcon}
      >
        <line x1="4" y1="21" x2="4" y2="14" />
        <line x1="4" y1="10" x2="4" y2="3" />
        <line x1="12" y1="21" x2="12" y2="12" />
        <line x1="12" y1="8" x2="12" y2="3" />
        <line x1="20" y1="21" x2="20" y2="16" />
        <line x1="20" y1="12" x2="20" y2="3" />
      </svg>

      <select
          className={TableStyle.select}
        value={filterQuery}
        onChange={(e) => onChange(e.target.value)} 
      >
        <option value="" className={TableStyle.options}>Filter</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>
            {opt}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TableFilter;
