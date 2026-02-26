import type { SelectHTMLAttributes } from 'react';

import clsx from 'clsx';

import type { SelectOption } from '@/shared/types/form';

import styles from './SelectInput.module.scss';

interface SelectInputProps extends SelectHTMLAttributes<HTMLSelectElement> {
  options: SelectOption[];
  placeholder?: string;
  hasError?: boolean;
}

export function SelectInput({
  options,
  placeholder,
  hasError,
  className,
  value,
  ...props
}: SelectInputProps) {
  return (
    <select
      className={clsx(
        styles.select,
        { [styles.select_error]: hasError },
        { [styles.select_placeholder]: !value },
        className,
      )}
      value={value}
      {...props}
    >
      {placeholder && (
        <option value="" disabled hidden>
          {placeholder}
        </option>
      )}

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}
