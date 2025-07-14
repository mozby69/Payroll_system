import { useMemo } from "react";
import { TableFilterConfig } from "@/app/components/buildFilterConfig";

interface Column<T> {
  key: keyof T;
}

function useFilteredTableData<T>(
  data: T[],
  columns: Column<T>[],
  searchQuery: string,
  onFilter?: TableFilterConfig<T>,
  filterQuery?: string,
): T[] {
  return useMemo(() => {
    let filtered = [...(Array.isArray(data) ? data : [])];


    if (onFilter && filterQuery) {
      filtered = filtered.filter((row) => onFilter.apply(row, filterQuery));
    }

    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((row) =>
        columns.some((col) => {
          const value = row[col.key];
          return value
            ?.toString()
            .toLowerCase()
            .includes(searchQuery.toLowerCase());
        })
      );
    }

    return filtered;
  }, [data, searchQuery, filterQuery]);
}


export default useFilteredTableData;