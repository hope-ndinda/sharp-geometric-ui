import { ButtonHTMLAttributes, ReactNode } from 'react';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** Visual variant of the button */
  variant?: ButtonVariant;
  /** Size variant of the button */
  size?: ButtonSize;
  /** Show loading spinner state and disable interactions */
  isLoading?: boolean;
  /** Icon element to display before button text */
  leftIcon?: ReactNode;
  /** Icon element to display after button text */
  rightIcon?: ReactNode;
  /** Full width button */
  fullWidth?: boolean;
}
