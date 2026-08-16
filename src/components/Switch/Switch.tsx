import React, { useState, useId } from 'react';
import styles from './Switch.module.css';
import { SwitchProps } from './Switch.types';

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onChange,
  label,
  size = 'md',
  disabled = false,
  ariaLabel,
}) => {
  const [isChecked, setIsChecked] = useState(checked);
  const labelId = useId();

  const currentChecked = checked !== undefined ? checked : isChecked;

  const handleToggle = () => {
    if (disabled) return;
    const next = !currentChecked;
    setIsChecked(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'Enter') {
      e.preventDefault();
      handleToggle();
    }
  };

  return (
    <label className={`${styles.wrapper} ${disabled ? styles.disabled : ''}`}>
      <button
        type="button"
        className={`${styles.switch} ${styles[size]} ${
          currentChecked ? styles.checked : ''
        }`}
        role="switch"
        aria-checked={currentChecked}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? ariaLabel : undefined}
        disabled={disabled}
        onClick={handleToggle}
        onKeyDown={handleKeyDown}
      >
        <span className={styles.thumb} />
      </button>
      {label && (
        <span id={labelId} className={styles.label}>
          {label}
        </span>
      )}
    </label>
  );
};
