import { useState, useMemo, useEffect } from "react";

const usePagination = <T,>(data: T[], initialRowsPerPage: number) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);

  const totalPages = useMemo(() => Math.ceil(data.length / rowsPerPage), [data.length, rowsPerPage]);

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [data.length, totalPages]);

  const displayedRows = useMemo(
    () => data.slice((currentPage - 1) * rowsPerPage, currentPage * rowsPerPage),
    [data, currentPage, rowsPerPage]
  );

  const getPaginationRange = useMemo(() => {
    const pageCountToShow = 5; 
    const range: (number | "...")[] = [];

    if (totalPages <= pageCountToShow) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const leftBoundary = Math.max(2, currentPage - 1);
    const rightBoundary = Math.min(totalPages - 1, currentPage + 1);

    range.push(1);
    if (leftBoundary > 2) range.push("...");
    for (let i = leftBoundary; i <= rightBoundary; i++) range.push(i);
    if (rightBoundary < totalPages - 1) range.push("...");
    range.push(totalPages);

    return range;
  }, [currentPage, totalPages]);

  return {
    currentPage,
    totalPages,
    displayedRows,
    setCurrentPage,
    setRowsPerPage,
    getPaginationRange,
  };
};

export default usePagination;
