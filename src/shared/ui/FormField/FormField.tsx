import type { ChangeEvent, ReactNode } from 'react';
import { Field } from 'react-final-form';

import clsx from 'clsx';

import { ErrorIcon } from './ErrorIcon';
import styles from './FormField.module.scss';

interface FieldRenderProps {
  id: string;
  name: string;
  value: string;
  onChange: (value: string | ChangeEvent<HTMLElement>) => void;
  onBlur: () => void;
  hasError: boolean;
  disabled?: boolean;
}

interface FormFieldProps {
  name: string;
  label: string;
  required?: boolean;
  children: (props: FieldRenderProps) => ReactNode;
  disabled?: boolean;
  extra?: ReactNode;
  hint?: string;
  className?: string;
}

export function FormField({ name, label, required, children, disabled, extra, hint, className }: FormFieldProps) {
  return (
    <Field name={name}>
      {({ input, meta }) => {
        const hasError = !!(meta.touched && meta.error);

        return (
          <div className={clsx(styles.field, className)}>
            <div className={styles.field__header}>
              <label className={styles.field__label} htmlFor={name}>
                {label}
                {required && <span className={styles.field__required}>*</span>}
              </label>

              {extra}
            </div>

            <div className={styles.field__input_wrap}>
              {children({
                id: name,
                name: input.name,
                value: input.value ?? '',
                onChange: input.onChange,
                onBlur: input.onBlur,
                hasError,
                disabled,
              })}

              {hasError && <ErrorIcon className={styles.field__icon} />}
            </div>

            {hasError && (
              <span className={styles.field__error} role="alert">
                {meta.error}
              </span>
            )}

            {!hasError && hint && <span className={styles.field__hint}>{hint}</span>}
          </div>
        );
      }}
    </Field>
  );
}