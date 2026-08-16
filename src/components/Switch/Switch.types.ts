import { ReactNode } from 'react';

export interface SwitchProps {
  /** Checked boolean state */
  checked?: boolean;
  /** Callback fired on state toggle */
  onChange?: (checked: boolean) => void;
  /** Label text or node displayed beside switch */
  label?: ReactNode;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state */
  disabled?: boolean;
  /** Accessible description/label */
  ariaLabel?: string;
}
