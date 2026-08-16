import React, { createContext, useContext, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { Info, CheckCircle2, AlertTriangle, AlertCircle, X } from 'lucide-react';
import styles from './Toast.module.css';
import { ToastItem, ToastContextValue, ToastProviderProps, ToastVariant } from './Toast.types';

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export const useToast = (): ToastContextValue => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};

export const ToastProvider: React.FC<ToastProviderProps> = ({
  children,
  position = 'bottom-right',
}) => {
  const [toasts, setToasts] = useState<ToastItem[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const toast = useCallback(
    (item: Omit<ToastItem, 'id'>) => {
      const id = Math.random().toString(36).substring(2, 9);
      const duration = item.duration ?? 4000;

      const newToast: ToastItem = { ...item, id };

      setToasts((prev) => [...prev, newToast]);

      if (duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, duration);
      }

      return id;
    },
    [dismiss]
  );

  const getVariantIcon = (variant: ToastVariant = 'info') => {
    switch (variant) {
      case 'success':
        return <CheckCircle2 size={20} />;
      case 'warning':
        return <AlertTriangle size={20} />;
      case 'error':
        return <AlertCircle size={20} />;
      default:
        return <Info size={20} />;
    }
  };

  const positionClass = styles[
    position.replace(/-([a-z])/g, (_, letter) => letter.toUpperCase()) as keyof typeof styles
  ] || styles.bottomRight;

  return (
    <ToastContext.Provider value={{ toast, dismiss, dismissAll }}>
      {children}
      {typeof document !== 'undefined' &&
        createPortal(
          <div
            className={`${styles.toastContainer} ${positionClass}`}
            aria-live="polite"
            aria-atomic="false"
          >
            {toasts.map((t) => (
              <div
                key={t.id}
                className={`${styles.toast} ${styles[t.variant || 'info']}`}
                role={t.variant === 'error' ? 'alert' : 'status'}
              >
                <div className={styles.iconWrapper}>{getVariantIcon(t.variant)}</div>
                <div className={styles.content}>
                  <h4 className={styles.title}>{t.title}</h4>
                  {t.description && <p className={styles.description}>{t.description}</p>}
                  {t.action && (
                    <button
                      type="button"
                      className={styles.actionButton}
                      onClick={() => {
                        t.action?.onClick();
                        dismiss(t.id);
                      }}
                    >
                      {t.action.label}
                    </button>
                  )}
                </div>
                <button
                  type="button"
                  className={styles.dismissButton}
                  onClick={() => dismiss(t.id)}
                  aria-label="Dismiss notification"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>,
          document.body
        )}
    </ToastContext.Provider>
  );
};
