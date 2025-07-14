import { useState } from "react";

interface SortConfig<T> {
  key: keyof T;
  direction: 'asc' | 'desc';
}

const useTableSort = <T,>(data: T[]): {
  sortedData: T[];
  sortConfig: SortConfig<T> | null;
  requestSort: (key: keyof T) => void;
} => {
  const [sortConfig, setSortConfig] = useState<SortConfig<T> | null>(null);

  const sortedData = [...data].sort((a, b) => {
    if (!sortConfig) return 0;
    const { key, direction } = sortConfig;
    const aValue = a[key];
    const bValue = b[key];
    if (aValue < bValue) return direction === 'asc' ? -1 : 1;
    if (aValue > bValue) return direction === 'asc' ? 1 : -1;
    return 0;
  });

  const requestSort = (key: keyof T) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig?.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return { sortedData, sortConfig, requestSort };
};

export default useTableSort;

