import React, { useState, useRef, useEffect, useId } from 'react';
import { ChevronDown } from 'lucide-react';
import { Button } from '../Button/Button';
import styles from './Dropdown.module.css';
import { DropdownProps } from './Dropdown.types';

export const Dropdown: React.FC<DropdownProps> = ({
  label,
  variant = 'outline',
  icon,
  items,
  customTrigger,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [focusedIndex, setFocusedIndex] = useState<number>(-1);

  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const menuId = useId();

  // Close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setFocusedIndex(-1);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update focus when focusedIndex changes
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && itemRefs.current[focusedIndex]) {
      itemRefs.current[focusedIndex]?.focus();
    }
  }, [isOpen, focusedIndex]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (['ArrowDown', 'ArrowUp', 'Enter', ' '].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
        setFocusedIndex(0);
      }
      return;
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prev) => (prev + 1) % items.length);
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prev) => (prev - 1 + items.length) % items.length);
        break;
      case 'Home':
        e.preventDefault();
        setFocusedIndex(0);
        break;
      case 'End':
        e.preventDefault();
        setFocusedIndex(items.length - 1);
        break;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setFocusedIndex(-1);
        triggerRef.current?.focus();
        break;
      case 'Tab':
        setIsOpen(false);
        setFocusedIndex(-1);
        break;
    }
  };

  const handleItemClick = (item: typeof items[0]) => {
    if (item.disabled) return;
    item.onClick?.();
    setIsOpen(false);
    setFocusedIndex(-1);
    triggerRef.current?.focus();
  };

  return (
    <div ref={containerRef} className={styles.container} onKeyDown={handleKeyDown}>
      {customTrigger ? (
        <div
          ref={triggerRef as any}
          tabIndex={0}
          role="button"
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen(!isOpen)}
        >
          {customTrigger}
        </div>
      ) : (
        <Button
          ref={triggerRef}
          variant={variant}
          leftIcon={icon}
          rightIcon={
            <ChevronDown
              size={16}
              className={`${styles.triggerChevron} ${isOpen ? styles.openChevron : ''}`}
            />
          }
          aria-haspopup="true"
          aria-expanded={isOpen}
          aria-controls={menuId}
          onClick={() => setIsOpen(!isOpen)}
        >
          {label}
        </Button>
      )}

      {isOpen && (
        <div id={menuId} className={styles.menu} role="menu" tabIndex={-1}>
          {items.map((item, index) => {
            const isFocused = index === focusedIndex;
            return (
              <button
                key={item.id}
                ref={(el) => (itemRefs.current[index] = el)}
                type="button"
                className={`${styles.menuitem} ${isFocused ? styles.menuitemFocused : ''} ${
                  item.disabled ? styles.disabled : ''
                } ${item.danger ? styles.danger : ''}`}
                role="menuitem"
                tabIndex={isFocused ? 0 : -1}
                disabled={item.disabled}
                onClick={() => handleItemClick(item)}
                onMouseEnter={() => setFocusedIndex(index)}
              >
                <span className={styles.menuitemIndex}>[{String(index + 1).padStart(2, '0')}]</span>
                {item.icon && <span>{item.icon}</span>}
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
