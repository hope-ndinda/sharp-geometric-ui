import React, { useState, useMemo } from 'react';
import { ArrowUpDown, ArrowUp, ArrowDown } from 'lucide-react';
import { Button } from '../Button/Button';
import styles from './DataTable.module.css';
import { DataTableProps } from './DataTable.types';

export function DataTable<T extends { id: string }>({
  columns,
  data,
  selectable = false,
  selectedRowIds = [],
  onSelectionChange,
  searchable = true,
  pageSize = 5,
  caption,
}: DataTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortKey, setSortKey] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedIds, setSelectedIds] = useState<string[]>(selectedRowIds);

  // Search Filtering
  const filteredData = useMemo(() => {
    if (!searchTerm.trim()) return data;
    const term = searchTerm.toLowerCase();
    return data.filter((row) =>
      columns.some((col) => {
        const val = row[col.key as keyof T];
        return val !== undefined && val !== null && String(val).toLowerCase().includes(term);
      })
    );
  }, [data, searchTerm, columns]);

  // Sorting
  const sortedData = useMemo(() => {
    if (!sortKey) return filteredData;
    return [...filteredData].sort((a, b) => {
      const aVal = a[sortKey as keyof T];
      const bVal = b[sortKey as keyof T];
      if (aVal === bVal) return 0;
      if (aVal === undefined || aVal === null) return 1;
      if (bVal === undefined || bVal === null) return -1;
      const res = aVal < bVal ? -1 : 1;
      return sortOrder === 'asc' ? res : -res;
    });
  }, [filteredData, sortKey, sortOrder]);

  // Pagination
  const totalPages = Math.ceil(sortedData.length / pageSize) || 1;
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * pageSize;
    return sortedData.slice(start, start + pageSize);
  }, [sortedData, currentPage, pageSize]);

  const handleSort = (key: string) => {
    if (sortKey === key) {
      if (sortOrder === 'asc') setSortOrder('desc');
      else {
        setSortKey(null);
        setSortOrder('asc');
      }
    } else {
      setSortKey(key);
      setSortOrder('asc');
    }
  };

  const toggleSelectAll = () => {
    let next: string[];
    const allCurrentPageIds = paginatedData.map((d) => d.id);
    const isAllSelected = allCurrentPageIds.every((id) => selectedIds.includes(id));

    if (isAllSelected) {
      next = selectedIds.filter((id) => !allCurrentPageIds.includes(id));
    } else {
      next = Array.from(new Set([...selectedIds, ...allCurrentPageIds]));
    }

    setSelectedIds(next);
    onSelectionChange?.(next);
  };

  const toggleSelectRow = (id: string) => {
    const next = selectedIds.includes(id)
      ? selectedIds.filter((i) => i !== id)
      : [...selectedIds, id];
    setSelectedIds(next);
    onSelectionChange?.(next);
  };

  return (
    <div className={styles.wrapper}>
      {searchable && (
        <div className={styles.toolbar}>
          <input
            type="search"
            className={styles.searchInput}
            placeholder="Search dataset records..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            aria-label="Search table data"
          />
          <div className={styles.monoNum}>
            Showing {paginatedData.length} of {filteredData.length} records
          </div>
        </div>
      )}

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          {caption && <caption className={styles.caption}>{caption}</caption>}
          <thead>
            <tr>
              {selectable && (
                <th className={styles.th} style={{ width: '40px' }}>
                  <input
                    type="checkbox"
                    className={styles.checkbox}
                    checked={
                      paginatedData.length > 0 &&
                      paginatedData.every((d) => selectedIds.includes(d.id))
                    }
                    onChange={toggleSelectAll}
                    aria-label="Select all rows on page"
                  />
                </th>
              )}
              {columns.map((col) => {
                const isSorted = sortKey === col.key;
                const ariaSort = !col.sortable
                  ? undefined
                  : isSorted
                  ? sortOrder === 'asc'
                    ? 'ascending'
                    : 'descending'
                  : 'none';

                return (
                  <th
                    key={col.key}
                    className={`${styles.th} ${col.sortable ? styles.sortableTh : ''}`}
                    style={{ width: col.width }}
                    aria-sort={ariaSort}
                    onClick={() => col.sortable && handleSort(col.key)}
                  >
                    <div className={styles.sortHeaderContent}>
                      <span>{col.header}</span>
                      {col.sortable && (
                        <span>
                          {isSorted ? (
                            sortOrder === 'asc' ? (
                              <ArrowUp size={14} />
                            ) : (
                              <ArrowDown size={14} />
                            )
                          ) : (
                            <ArrowUpDown size={14} style={{ opacity: 0.4 }} />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className={styles.td}
                  style={{ textAlign: 'center', padding: '2rem' }}
                >
                  No matching records found.
                </td>
              </tr>
            ) : (
              paginatedData.map((row) => {
                const isSelected = selectedIds.includes(row.id);
                return (
                  <tr
                    key={row.id}
                    className={`${styles.row} ${isSelected ? styles.rowSelected : ''}`}
                  >
                    {selectable && (
                      <td className={styles.td}>
                        <input
                          type="checkbox"
                          className={styles.checkbox}
                          checked={isSelected}
                          onChange={() => toggleSelectRow(row.id)}
                          aria-label={`Select row ${row.id}`}
                        />
                      </td>
                    )}
                    {columns.map((col) => (
                      <td key={col.key} className={styles.td}>
                        {col.render ? col.render(row) : (row[col.key as keyof T] as React.ReactNode)}
                      </td>
                    ))}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {totalPages > 1 && (
        <div className={styles.pagination}>
          <div>
            Page {currentPage} of {totalPages}
          </div>
          <div className={styles.paginationButtons}>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            >
              Previous
            </Button>
            <Button
              size="sm"
              variant="outline"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
