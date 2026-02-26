import type { TextareaHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './TextareaInput.module.scss';

interface TextareaInputProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  hasError?: boolean;
}

export function TextareaInput({ hasError, className, ...props }: TextareaInputProps) {
  return (
    <textarea
      className={clsx(styles.textarea, { [styles.textarea_error]: hasError }, className)}
      rows={1}
      {...props}
    />
  );
}
