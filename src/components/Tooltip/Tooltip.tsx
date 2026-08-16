import React, { useState, useRef, useId } from 'react';
import styles from './Tooltip.module.css';
import { TooltipProps } from './Tooltip.types';

export const Tooltip: React.FC<TooltipProps> = ({
  content,
  children,
  position = 'top',
  delay = 200,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const tooltipId = useId();

  const showTooltip = () => {
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, delay);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setIsVisible(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      hideTooltip();
    }
  };

  return (
    <div
      className={styles.wrapper}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
      onFocus={showTooltip}
      onBlur={hideTooltip}
      onKeyDown={handleKeyDown}
    >
      {React.isValidElement(children)
        ? React.cloneElement(children as React.ReactElement<any>, {
            'aria-describedby': isVisible ? tooltipId : undefined,
          })
        : children}

      {isVisible && (
        <div
          id={tooltipId}
          className={`${styles.tooltip} ${styles[position]}`}
          role="tooltip"
        >
          {content}
        </div>
      )}
    </div>
  );
};
