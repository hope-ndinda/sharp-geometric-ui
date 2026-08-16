export interface DatePickerProps {
  /** Currently selected Date */
  value?: Date | null;
  /** Selection change callback */
  onChange?: (date: Date | null) => void;
  /** Input placeholder string */
  placeholder?: string;
  /** Accessible label */
  ariaLabel?: string;
  /** Min selectable date */
  minDate?: Date;
  /** Max selectable date */
  maxDate?: Date;
}
