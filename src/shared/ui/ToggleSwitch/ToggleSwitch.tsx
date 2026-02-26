import clsx from 'clsx';

import styles from './ToggleSwitch.module.scss';

interface ToggleSwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
}

export function ToggleSwitch({ checked, onChange, label, disabled }: ToggleSwitchProps) {
  return (
    <label className={styles.toggle}>
      {label && <span className={styles.toggle__label}>{label}</span>}

      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
        disabled={disabled}
        className={styles.toggle__input}
      />
      <span className={clsx(styles.toggle__slider, { [styles.toggle__slider_on]: checked })} />
    </label>
  );
}
