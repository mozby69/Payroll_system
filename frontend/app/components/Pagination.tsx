import React from "react";
import styles from "@/public/css/pagination.module.css";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({currentPage,totalPages,onPageChange}: PaginationProps) {
  const getVisiblePages = (): (number | string)[] => {
    const pages: (number | string)[] = [];

    if (totalPages <= 3) {

      for (let i = 1; i <= totalPages; i++) pages.push(i);
      return pages;
    }

    const firstPage = 1;
    const lastPage = totalPages;

    if (currentPage <= 2) {

      pages.push(1, 2, 3, "..", lastPage);
    } else if (currentPage >= totalPages - 1) {

      pages.push(firstPage, "..", totalPages - 2, totalPages - 1, totalPages);
    } else {

      pages.push(firstPage, "..", currentPage - 1, currentPage, currentPage + 1, "..", lastPage);
    }

    return pages;
  };

  const pages = getVisiblePages();

  return (
    <div className={styles.main_pagination}>
      <button
        className={styles.page_button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(1)}
      >
        «
      </button>
      <button
        className={styles.page_button}
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
      >
        ‹
      </button>

      {pages.map((page, idx) =>
        typeof page === "number" ? (
          <button
            key={idx}
            className={`${styles.page_button} ${
              currentPage === page ? styles.active : ""
            }`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </button>
        ) : (
          <span key={idx} className={styles.page_dots}>
            {page}
          </span>
        )
      )}

      <button
        className={styles.page_button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
      >
        ›
      </button>
      <button
        className={styles.page_button}
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(totalPages)}
      >
        »
      </button>
    </div>
  );
}
