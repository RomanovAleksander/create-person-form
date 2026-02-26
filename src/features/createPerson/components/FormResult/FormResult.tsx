import type { CreatePersonFormValues } from '../../validation/createPersonSchema';
import styles from './FormResult.module.scss';

interface FormResultProps {
  data: Partial<CreatePersonFormValues>;
}

export function FormResult({ data }: FormResultProps) {
  return (
    <div className={styles.result}>
      <h3 className={styles.result__title}>Результат</h3>
      <pre className={styles.result__json}>{JSON.stringify(data, null, 2)}</pre>
    </div>
  );
}
