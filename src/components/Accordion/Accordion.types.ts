import { ReactNode } from 'react';

export interface AccordionItem {
  id: string;
  title: ReactNode;
  content: ReactNode;
  disabled?: boolean;
}

export interface AccordionProps {
  /** Array of accordion panels */
  items: AccordionItem[];
  /** Allow multiple items open simultaneously */
  allowMultiple?: boolean;
  /** Currently expanded item IDs */
  expandedIds?: string[];
  /** Callback on change */
  onChange?: (ids: string[]) => void;
}
