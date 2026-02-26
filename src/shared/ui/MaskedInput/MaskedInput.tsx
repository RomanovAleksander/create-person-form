import type { HTMLAttributes } from 'react';

import { IMaskInput } from 'react-imask';

import clsx from 'clsx';

import styles from './MaskedInput.module.scss';

export interface MaskedInputProps {
  mask: string;
  inputMode?: HTMLAttributes<HTMLInputElement>['inputMode'];
  placeholder?: string;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (value: string) => void;
  onBlur?: () => void;
  hasError?: boolean;
  disabled?: boolean;
  className?: string;
}

export function MaskedInput({ hasError, className, onChange, value, ...props }: MaskedInputProps) {
  return (
    <IMaskInput
      value={value ?? ''}
      className={clsx(styles.input, { [styles.input_error]: hasError }, className)}
      onAccept={(value) => onChange?.(value as string)}
      {...props}
    />
  );
}
