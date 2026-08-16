import React, { useState, useRef, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import styles from './Accordion.module.css';
import { AccordionProps } from './Accordion.types';

export const Accordion: React.FC<AccordionProps> = ({
  items,
  allowMultiple = false,
  expandedIds = [],
  onChange,
}) => {
  const [openIds, setOpenIds] = useState<string[]>(
    expandedIds.length > 0 ? expandedIds : [items[0]?.id].filter(Boolean)
  );

  const buttonRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const handleToggle = (id: string, disabled?: boolean) => {
    if (disabled) return;

    let next: string[];
    const isCurrentlyOpen = openIds.includes(id);

    if (allowMultiple) {
      next = isCurrentlyOpen ? openIds.filter((i) => i !== id) : [...openIds, id];
    } else {
      next = isCurrentlyOpen ? [] : [id];
    }

    setOpenIds(next);
    onChange?.(next);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextIndex = (index + 1) % items.length;
      buttonRefs.current[nextIndex]?.focus();
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevIndex = (index - 1 + items.length) % items.length;
      buttonRefs.current[prevIndex]?.focus();
    } else if (e.key === 'Home') {
      e.preventDefault();
      buttonRefs.current[0]?.focus();
    } else if (e.key === 'End') {
      e.preventDefault();
      buttonRefs.current[items.length - 1]?.focus();
    }
  };

  return (
    <div className={styles.accordion}>
      {items.map((item, idx) => {
        const isOpen = openIds.includes(item.id);
        const buttonId = `${baseId}-header-${item.id}`;
        const contentId = `${baseId}-content-${item.id}`;

        return (
          <div key={item.id} className={styles.item}>
            <h3 className={styles.header}>
              <button
                ref={(el) => (buttonRefs.current[idx] = el)}
                id={buttonId}
                type="button"
                className={`${styles.trigger} ${item.disabled ? styles.disabled : ''}`}
                aria-expanded={isOpen}
                aria-controls={contentId}
                disabled={item.disabled}
                onClick={() => handleToggle(item.id, item.disabled)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
              >
                <span>
                  <span className={styles.triggerIndex}>{String(idx + 1).padStart(2, '0')} //</span>
                  {item.title}
                </span>
                <ChevronDown
                  size={18}
                  className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ''}`}
                />
              </button>
            </h3>

            {isOpen && (
              <div
                id={contentId}
                className={styles.content}
                role="region"
                aria-labelledby={buttonId}
              >
                {item.content}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};
