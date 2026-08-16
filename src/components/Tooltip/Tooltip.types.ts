import { ReactNode } from 'react';

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right';

export interface TooltipProps {
  /** Text or element inside tooltip */
  content: ReactNode;
  /** Children element that triggers the tooltip */
  children: ReactNode;
  /** Preferred position relative to trigger */
  position?: TooltipPosition;
  /** Delay in milliseconds before showing tooltip on hover */
  delay?: number;
}
