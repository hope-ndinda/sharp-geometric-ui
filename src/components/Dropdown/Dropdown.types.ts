import { ReactNode } from 'react';

export interface DropdownItem {
  id: string;
  label: string;
  icon?: ReactNode;
  disabled?: boolean;
  danger?: boolean;
  onClick?: () => void;
}

export interface DropdownProps {
  /** Label for trigger button */
  label: string;
  /** Trigger button visual variant */
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  /** Trigger icon */
  icon?: ReactNode;
  /** Menu items list */
  items: DropdownItem[];
  /** Optional custom trigger node override */
  customTrigger?: ReactNode;
}
