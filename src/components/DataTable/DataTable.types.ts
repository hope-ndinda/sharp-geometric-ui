import { ReactNode } from 'react';

export interface Column<T> {
  key: string;
  header: string;
  render?: (row: T) => ReactNode;
  sortable?: boolean;
  width?: string;
}

export interface DataTableProps<T extends { id: string }> {
  /** Column definitions */
  columns: Column<T>[];
  /** Array of data items */
  data: T[];
  /** Enable row selection checkboxes */
  selectable?: boolean;
  /** Array of selected row IDs */
  selectedRowIds?: string[];
  /** Selection change callback */
  onSelectionChange?: (selectedIds: string[]) => void;
  /** Enable search filter input */
  searchable?: boolean;
  /** Page size limit */
  pageSize?: number;
  /** Caption / Table Title for screen readers */
  caption?: string;
}
