import { ReactNode } from 'react';

export interface TabItem {
  id: string;
  label: ReactNode;
  content: ReactNode;
  icon?: ReactNode;
  disabled?: boolean;
}

export interface TabsProps {
  /** Array of tabs */
  tabs: TabItem[];
  /** Controlled active tab ID */
  activeId?: string;
  /** Callback on active tab change */
  onChange?: (id: string) => void;
  /** Orientation of tablist */
  orientation?: 'horizontal' | 'vertical';
  /** Accessible label for the tablist */
  ariaLabel?: string;
}
