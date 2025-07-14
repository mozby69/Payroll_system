import React from "react";
import TableStyle from "@/public/css/tableComponent.module.css";

interface TableSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

function TableSearch({ searchQuery, setSearchQuery }: TableSearchProps) {
  return (
 <div className={TableStyle.searchContainer}>
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
        className={TableStyle.searchIcon}
      >
        <path d="M21 21l-4.34-4.34" />
        <circle cx="11" cy="11" r="8" />
      </svg>
      <input
        type="text"
        placeholder="Search..."
        className={TableStyle.searchInput}
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
    </div>
  );
}

export default TableSearch;
