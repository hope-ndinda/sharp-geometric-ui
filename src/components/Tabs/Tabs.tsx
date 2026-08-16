import React, { useState, useRef, useId } from 'react';
import styles from './Tabs.module.css';
import { TabsProps } from './Tabs.types';

export const Tabs: React.FC<TabsProps> = ({
  tabs,
  activeId,
  onChange,
  orientation = 'horizontal',
  ariaLabel = 'Navigation Tabs',
}) => {
  const [selectedId, setSelectedId] = useState<string>(activeId || tabs[0]?.id || '');
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const baseId = useId();

  const currentTabId = activeId !== undefined ? activeId : selectedId;

  const handleSelect = (id: string, disabled?: boolean) => {
    if (disabled) return;
    if (activeId === undefined) {
      setSelectedId(id);
    }
    onChange?.(id);
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const isHorizontal = orientation === 'horizontal';
    const nextKey = isHorizontal ? 'ArrowRight' : 'ArrowDown';
    const prevKey = isHorizontal ? 'ArrowLeft' : 'ArrowUp';

    let nextIndex = index;

    if (e.key === nextKey) {
      e.preventDefault();
      nextIndex = (index + 1) % tabs.length;
      while (tabs[nextIndex]?.disabled && nextIndex !== index) {
        nextIndex = (nextIndex + 1) % tabs.length;
      }
    } else if (e.key === prevKey) {
      e.preventDefault();
      nextIndex = (index - 1 + tabs.length) % tabs.length;
      while (tabs[nextIndex]?.disabled && nextIndex !== index) {
        nextIndex = (nextIndex - 1 + tabs.length) % tabs.length;
      }
    } else if (e.key === 'Home') {
      e.preventDefault();
      nextIndex = 0;
    } else if (e.key === 'End') {
      e.preventDefault();
      nextIndex = tabs.length - 1;
    }

    if (nextIndex !== index && !tabs[nextIndex]?.disabled) {
      const targetTab = tabs[nextIndex];
      handleSelect(targetTab.id, targetTab.disabled);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  const activeTab = tabs.find((t) => t.id === currentTabId) || tabs[0];

  return (
    <div
      className={`${styles.container} ${
        orientation === 'vertical' ? styles.verticalContainer : ''
      }`}
    >
      <div
        className={`${styles.tablist} ${
          orientation === 'vertical' ? styles.verticalTablist : ''
        }`}
        role="tablist"
        aria-orientation={orientation}
        aria-label={ariaLabel}
      >
        {tabs.map((tab, idx) => {
          const isSelected = tab.id === currentTabId;
          const tabElementId = `${baseId}-tab-${tab.id}`;
          const panelElementId = `${baseId}-panel-${tab.id}`;

          return (
            <button
              key={tab.id}
              ref={(el) => (tabRefs.current[idx] = el)}
              id={tabElementId}
              type="button"
              className={`${styles.tab} ${isSelected ? styles.tabSelected : ''} ${
                tab.disabled ? styles.disabled : ''
              }`}
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelElementId}
              tabIndex={isSelected ? 0 : -1}
              disabled={tab.disabled}
              onClick={() => handleSelect(tab.id, tab.disabled)}
              onKeyDown={(e) => handleKeyDown(e, idx)}
            >
              {tab.icon && <span>{tab.icon}</span>}
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {activeTab && (
        <div
          id={`${baseId}-panel-${activeTab.id}`}
          className={styles.panel}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeTab.id}`}
          tabIndex={0}
        >
          {activeTab.content}
        </div>
      )}
    </div>
  );
};
