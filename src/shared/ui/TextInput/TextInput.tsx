import type { InputHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './TextInput.module.scss';

interface TextInputProps extends InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean;
}

export function TextInput({ hasError, className, ...props }: TextInputProps) {
  return (
    <input
      type="text"
      className={clsx(styles.input, { [styles.input_error]: hasError }, className)}
      {...props}
    />
  );
}
