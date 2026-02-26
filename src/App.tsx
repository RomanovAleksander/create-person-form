import { CreatePersonForm } from '@/features/createPerson/components/CreatePersonForm';

import styles from './App.module.scss';

export function App() {
  return (
    <div className={styles.app}>
      <div className={styles.app__card}>
        <header className={styles.app__header}>
          <h1 className={styles.app__title}>Створення персони</h1>
        </header>

        <main className={styles.app__content}>
          <CreatePersonForm />
        </main>
      </div>
    </div>
  );
}
