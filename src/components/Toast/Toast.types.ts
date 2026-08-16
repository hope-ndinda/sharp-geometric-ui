import { ReactNode } from 'react';

export type ToastVariant = 'info' | 'success' | 'warning' | 'error';
export type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left';

export interface ToastItem {
  id: string;
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number; // ms
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface ToastContextValue {
  toast: (item: Omit<ToastItem, 'id'>) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export interface ToastProviderProps {
  children: ReactNode;
  position?: ToastPosition;
}
