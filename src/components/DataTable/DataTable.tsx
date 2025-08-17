import React, { useState } from "react";

export interface Column<T> {
  key: string;
  title: string;
  dataIndex: keyof T;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: Column<T>[];
  loading?: boolean;
  selectable?: "single" | "multiple"; // 👈 updated
  onRowSelect?: (selectedRows: T[]) => void;
}

export function DataTable<T extends { id: string | number }>({
  data,
  columns,
  loading = false,
  selectable,
  onRowSelect,
}: DataTableProps<T>) {
  const [selectedRows, setSelectedRows] = useState<T[]>([]);
  const [sortConfig, setSortConfig] = useState<{ key: keyof T; direction: "asc" | "desc" } | null>(null);

  const handleSort = (col: Column<T>) => {
    if (!col.sortable) return;
    let direction: "asc" | "desc" = "asc";
    if (sortConfig && sortConfig.key === col.dataIndex && sortConfig.direction === "asc") {
      direction = "desc";
    }
    setSortConfig({ key: col.dataIndex, direction });
  };

  const sortedData = React.useMemo(() => {
    if (!sortConfig) return data;
    return [...data].sort((a, b) => {
      const aVal = a[sortConfig.key];
      const bVal = b[sortConfig.key];
      if (aVal < bVal) return sortConfig.direction === "asc" ? -1 : 1;
      if (aVal > bVal) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });
  }, [data, sortConfig]);

  const toggleRow = (row: T) => {
    let newSelection: T[] = [];

    if (selectedRows.find((r) => r.id === row.id)) {
      // deselect if already selected
      newSelection = selectedRows.filter((r) => r.id !== row.id);
    } else {
      // select new row(s)
      newSelection = selectable === "multiple" ? [...selectedRows, row] : [row];
    }

    setSelectedRows(newSelection);
    onRowSelect?.(newSelection);
  };

  if (loading) {
    return <div className="p-4 text-gray-500 dark:text-gray-300">Loading...</div>;
  }

  if (!data || data.length === 0) {
    return <div className="p-4 text-gray-500 dark:text-gray-300">No data available</div>;
  }

  return (
    <div className="overflow-x-auto border rounded-lg dark:border-gray-700">
      <table className="min-w-full text-left border-collapse">
        <thead className="bg-gray-100 dark:bg-gray-800">
          <tr>
            {selectable && <th className="px-4 py-2">Select</th>}
            {columns.map((col) => (
              <th
                key={col.key}
                onClick={() => handleSort(col)}
                className={`px-4 py-2 font-semibold text-gray-700 dark:text-gray-200 ${
                  col.sortable ? "cursor-pointer hover:underline" : ""
                }`}
              >
                {col.title}
                {sortConfig?.key === col.dataIndex && (sortConfig.direction === "asc" ? " 🔼" : " 🔽")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {sortedData.map((row) => (
            <tr
              key={row.id}
              className="border-t dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800"
            >
              {selectable && (
                <td className="px-4 py-2">
                  <input
                    type={selectable === "single" ? "radio" : "checkbox"} // 👈 single uses radio
                    name="row-selection"
                    checked={!!selectedRows.find((r) => r.id === row.id)}
                    onChange={() => toggleRow(row)}
                  />
                </td>
              )}
              {columns.map((col) => (
                <td key={col.key} className="px-4 py-2 text-gray-700 dark:text-gray-200">
                  {String(row[col.dataIndex])}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export type { Column, DataTableProps };
