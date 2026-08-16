import { ReactNode } from 'react';

export type ModalSize = 'sm' | 'md' | 'lg' | 'full';

export interface ModalProps {
  /** Controls open state */
  isOpen: boolean;
  /** Callback fired when user attempts to close modal */
  onClose: () => void;
  /** Title of the modal dialog */
  title: string;
  /** Description or subtitle for accessible label */
  description?: string;
  /** Modal body content */
  children: ReactNode;
  /** Footer content (e.g. Action Buttons) */
  footer?: ReactNode;
  /** Modal size variant */
  size?: ModalSize;
  /** Whether clicking overlay closes modal */
  closeOnOverlayClick?: boolean;
  /** Whether pressing Escape key closes modal */
  closeOnEscape?: boolean;
}
