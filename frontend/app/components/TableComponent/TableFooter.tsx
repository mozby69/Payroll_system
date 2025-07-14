import React from "react";
import styles from "@/public/css/tableComponent.module.css";

interface TableFooterProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
  totalEntries: number;
  rowsPerPage: number;
  getPaginationRange: () => (number | "...")[];
}

const TableFooter: React.FC<TableFooterProps> = ({
  currentPage,
  totalPages,
  setCurrentPage,
  totalEntries,
  rowsPerPage,
  getPaginationRange,
}) => {
  return (
  <div className={styles.footerWrapper}>
  
        <span>
          Showing {totalEntries === 0 ? 0 : (currentPage - 1) * rowsPerPage + 1} to{" "}
          {Math.min(currentPage * rowsPerPage, totalEntries)} of {totalEntries.toLocaleString()} entries
        </span>

        <div className={styles.pagination}>
          <button
            className={`px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-300 opacity-50" : `${styles.button} ${styles.buttonDefault}`}`}
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

        {getPaginationRange().map((page, index) => (
          <button
            key={index}
            className={`px-3 py-1 rounded ${
              page === currentPage ? styles.buttonActive : styles.buttonDefault
            } ${page === "..." ? styles.buttonEllipsis : ""}`}
            onClick={() => typeof page === "number" && setCurrentPage(page)}
            disabled={page === "..."}
          >
            {page}
          </button>
        ))}


        <button
          className={`px-3 py-1 rounded ${currentPage === totalPages ? `${styles.button} ${styles.buttonDefault}` : "bg-gray-200"}`}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default React.memo(TableFooter);
