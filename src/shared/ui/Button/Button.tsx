import type { ButtonHTMLAttributes } from 'react';

import clsx from 'clsx';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
}

export function Button({ variant = 'primary', className, children, ...props }: ButtonProps) {
  return (
    <button
      className={clsx(styles.button, styles[`button_${variant}`], className)}
      {...props}
    >
      {children}
    </button>
  );
}
