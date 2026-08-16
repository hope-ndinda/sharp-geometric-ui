import React, { useState, useRef, useEffect, useId } from 'react';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';
import styles from './DatePicker.module.css';
import { DatePickerProps } from './DatePicker.types';

const MONTH_NAMES = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

export const DatePicker: React.FC<DatePickerProps> = ({
  value = null,
  onChange,
  placeholder = 'YYYY-MM-DD',
  ariaLabel = 'Select Date',
  minDate,
  maxDate,
}) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(value);
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState<Date>(value || new Date());
  const [focusedDate, setFocusedDate] = useState<Date>(value || new Date());

  const containerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLTableElement>(null);

  const gridId = useId();

  // Sync prop value
  useEffect(() => {
    if (value !== undefined) {
      setSelectedDate(value);
      if (value) {
        setViewDate(value);
        setFocusedDate(value);
      }
    }
  }, [value]);

  // Click outside listener
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDate = (date: Date | null) => {
    if (!date) return '';
    const yyyy = date.getFullYear();
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const dd = String(date.getDate()).padStart(2, '0');
    return `${yyyy}-${mm}-${dd}`;
  };

  const getDaysInMonth = (year: number, month: number) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (year: number, month: number) => {
    return new Date(year, month, 1).getDay();
  };

  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const changeMonth = (delta: number) => {
    const next = new Date(year, month + delta, 1);
    setViewDate(next);
    setFocusedDate(new Date(next.getFullYear(), next.getMonth(), Math.min(focusedDate.getDate(), getDaysInMonth(next.getFullYear(), next.getMonth()))));
  };

  const isSameDay = (d1: Date | null, d2: Date | null) => {
    if (!d1 || !d2) return false;
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const handleSelectDate = (date: Date) => {
    setSelectedDate(date);
    onChange?.(date);
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (!isOpen) {
      if (['Enter', ' ', 'ArrowDown'].includes(e.key)) {
        e.preventDefault();
        setIsOpen(true);
      }
      return;
    }

    const current = new Date(focusedDate);

    switch (e.key) {
      case 'ArrowLeft':
        e.preventDefault();
        current.setDate(current.getDate() - 1);
        break;
      case 'ArrowRight':
        e.preventDefault();
        current.setDate(current.getDate() + 1);
        break;
      case 'ArrowUp':
        e.preventDefault();
        current.setDate(current.getDate() - 7);
        break;
      case 'ArrowDown':
        e.preventDefault();
        current.setDate(current.getDate() + 7);
        break;
      case 'PageUp':
        e.preventDefault();
        current.setMonth(current.getMonth() - 1);
        break;
      case 'PageDown':
        e.preventDefault();
        current.setMonth(current.getMonth() + 1);
        break;
      case 'Enter':
      case ' ':
        e.preventDefault();
        handleSelectDate(focusedDate);
        return;
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        return;
    }

    setFocusedDate(current);
    if (current.getMonth() !== viewDate.getMonth() || current.getFullYear() !== viewDate.getFullYear()) {
      setViewDate(current);
    }
  };

  // Build grid matrix
  const daysArray: (Date | null)[] = [];
  for (let i = 0; i < firstDay; i++) {
    daysArray.push(null);
  }
  for (let d = 1; d <= daysInMonth; d++) {
    daysArray.push(new Date(year, month, d));
  }

  const rows: (Date | null)[][] = [];
  for (let i = 0; i < daysArray.length; i += 7) {
    rows.push(daysArray.slice(i, i + 7));
  }

  return (
    <div ref={containerRef} className={styles.container} onKeyDown={handleKeyDown}>
      <div className={styles.inputGroup}>
        <input
          type="text"
          readOnly
          className={styles.input}
          placeholder={placeholder}
          value={formatDate(selectedDate)}
          aria-label={ariaLabel}
          onClick={() => setIsOpen(!isOpen)}
        />
        {selectedDate && (
          <button
            type="button"
            className={styles.iconButton}
            onClick={() => {
              setSelectedDate(null);
              onChange?.(null);
            }}
            aria-label="Clear selected date"
          >
            <X size={16} />
          </button>
        )}
        <button
          type="button"
          className={styles.iconButton}
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle calendar popover"
          aria-expanded={isOpen}
        >
          <Calendar size={18} />
        </button>
      </div>

      {isOpen && (
        <div className={styles.popover} role="dialog" aria-label="Choose Date">
          <div className={styles.header}>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => changeMonth(-1)}
              aria-label="Previous month"
            >
              <ChevronLeft size={16} />
            </button>
            <span className={styles.monthLabel}>
              {MONTH_NAMES[month]} {year}
            </span>
            <button
              type="button"
              className={styles.navButton}
              onClick={() => changeMonth(1)}
              aria-label="Next month"
            >
              <ChevronRight size={16} />
            </button>
          </div>

          <table ref={gridRef} id={gridId} className={styles.grid} role="grid" tabIndex={0}>
            <thead>
              <tr role="row">
                {WEEKDAYS.map((w) => (
                  <th key={w} className={styles.weekHeader} role="columnheader">
                    {w}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, rIdx) => (
                <tr key={rIdx} role="row">
                  {row.map((date, cIdx) => {
                    if (!date) {
                      return <td key={cIdx} className={styles.dayCell} role="gridcell" />;
                    }

                    const isSelected = isSameDay(date, selectedDate);
                    const isFocused = isSameDay(date, focusedDate);
                    const isDisabled =
                      (minDate && date < new Date(minDate.setHours(0,0,0,0))) ||
                      (maxDate && date > new Date(maxDate.setHours(23,59,59,999)));

                    return (
                      <td key={cIdx} className={styles.dayCell} role="gridcell" aria-selected={isSelected}>
                        <button
                          type="button"
                          className={`${styles.dayButton} ${isSelected ? styles.daySelected : ''} ${
                            isFocused ? styles.dayFocused : ''
                          } ${isDisabled ? styles.disabled : ''}`}
                          tabIndex={isFocused ? 0 : -1}
                          disabled={Boolean(isDisabled)}
                          onClick={() => !isDisabled && handleSelectDate(date)}
                        >
                          {date.getDate()}
                        </button>
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
